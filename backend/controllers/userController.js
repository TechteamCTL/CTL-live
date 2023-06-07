/* get User require from user model */
const User = require("../models/UserModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const crypto = require("crypto");
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      phone,
      mobile,
      location,
      company,
      role,
      deliveryAddress,
      billAddress,
      state,
      postCode,
    } = req.body;
    if (
      !(
        name &&
        lastName &&
        email &&
        password &&
        phone &&
        mobile &&
        location &&
        company &&
        role &&
        deliveryAddress &&
        billAddress &&
        state &&
        postCode
      )
    ) {
      return res.status(400).send("All inputs are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      // 用hashedPasswrod把password加密
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        mobile,
        location,
        company,
        role,
        deliveryAddress,
        billAddress,
        state,
        postCode,
      });

      // verify email address if end with slrltd.com
      if (
        (
          email.endsWith("@slrltd.com") ||
          email.endsWith("@ctlservices.com.au") ||
          email.endsWith("@focusminerals.com.au") ||
          email.endsWith("@evolutionmining.com")
        ) && 
        email !== 'Mekins@slrltd.com' &&
        email !== 'Esmith@slrltd.com' &&
        email !== 'enzo@ctlservices.com.au'
      ) {
        const token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
      
/*       if (
        email.endsWith("@slrltd.com") ||
        email.endsWith("@ctlservices.com.au") ||
        email.endsWith("@focusminerals.com.au") ||
        email.endsWith("@evolutionmining.com")
      ) {
        const token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      } */

      res
        // cookie以后用户用这个访问过来,CTL不想要新注册的人有cookie，就给移除了
        /*         .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin,
            user.verified,
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        ) */
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            verified: user.verified,
            phone: user.phone,
            mobile: user.mobile,
            location: user.mobile,
            company: user.company,
            role: user.role,
            deliveryAddress: user.deliveryAddress,
            billAddress: user.billAddress,
            state: user.state,
            postCode: user.postCode,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};

/* const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Get user's current public IP address
    const ipAddress = req.headers["x-forwarded-for"]?.split(", ")[0] || req.connection.remoteAddress;


    const user = await User.findOne({ email });
    // compare passwords
    if (user && comparePasswords(password, user.password)) {
      // Check if user's IP matches the locked IP
      if (user.ipAddress && user.ipAddress !== ipAddress) {
        return res.status(403).send("Access denied from this IP address");
      }

      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 9 }; // 1000=1ms
      }

      // Update user's IP address in the database
      await User.updateOne({ _id: user._id }, { $set: { ipAddress } });

      // Verify Email
      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
          await sendEmail(user.email, "Verify Email", url);
        }

        return res
          .status(400)
          .send({ message: "An Email sent to your account please verify" });
      }

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin,
            user.verified
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            verified:user.verified,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
}; */

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Get user's current public IP address
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(", ")[0] ||
      req.connection.remoteAddress;

    const user = await User.findOne({ email });

    // Compare passwords
    if (user && comparePasswords(password, user.password)) {
      // Skip IP address check for ctlservices.com.au emails
      const skipIpAddressCheck = email.endsWith("ctlservices.com.au");
      if (
        !skipIpAddressCheck &&
        user.ipAddress &&
        user.ipAddress !== ipAddress
      ) {
        return res.status(403).send("Access denied from this IP address");
      }

      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 9 }; // 1000=1ms
      }

      // Update user's IP address in the database
      await User.updateOne({ _id: user._id }, { $set: { ipAddress } });

      // Verify Email
      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
          await sendEmail(user.email, "Verify Email", url);
        }

        return res
          .status(400)
          .send({ message: "An Email sent to your account please verify" });
      }

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin,
            user.verified
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            verified: user.verified,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    // await User.updateOne({ _id: user._id, verified: true });
    await User.updateOne({ _id: user._id }, { verified: true });

    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    /* 这里我们不需要用户更改邮箱地址 */
    // user.email = req.body.email || user.email;
    user.phone = req.body.phone;
    user.mobile = req.body.mobile;
    user.location = req.body.location;
    user.postCode = req.body.postCode;
    user.deliveryAddress = req.body.deliveryAddress;
    user.billAddress = req.body.billAddress;
    user.state = req.body.state;
    user.company = req.body.company;
    user.role = req.body.role;
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        deliveryAddress: user.deliveryAddress,
        billAddress: user.billAddress,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select(
        "name lastName email ipAddress isAdmin deliveryAddress billAddress"
      )
      .orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.deliveryAddress = req.body.deliveryAddress || user.deliveryAddress;
    user.billAddress = req.body.billAddress || user.billAddress;

    if (req.body.ipAddress === "") {
      user.ipAddress = "";
    } else {
      user.ipAddress = req.body.ipAddress || user.ipAddress;
    }

    user.isAdmin = req.body.isAdmin;

    await user.save();

    res.send("user updated");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    await user.remove();
    res.send("user removed");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  verifyEmail,
  updateUserProfile,
  updateUserPassword,
  getUserProfile,
  getUser,
  updateUser,
  deleteUser,
};
