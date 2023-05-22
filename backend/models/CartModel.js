const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    /* 
    因为跟addToCart(cartActions.js -> redux)的productId对不上，必须要把 productID 改为 productId， 要不然写不进去
    */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        productId: { type: String, required: false },
        name: { type: String, required: true },
        image: { type: String, required: true },
        saleunit: {
          type: Number,
          required: true,
        },
        cartProducts: [
          {
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            count: { type: Number, required: true },
            ctlsku: { type: String, required: false },
            attrs: { type: String, required: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

/* 
上面这个东西（'Cart'，cartSchema）中的Cart是用来创建 数据库中的 词条的， Cart 就会创建一个 carts。如果我给他改成CARTTTTTT 就会创建一个 cartttttts 出来， 好像大小写无关，都是小写的数据库.
但是 如果是 Cart1，那么就会创建一个 cart1 的 collection 出来， 而不是 cart1s
这个 cartSchema 就是 用来 规范数据的。
*/

/* 
model这个文件是 用来 定义数据的模式，包括字段、类型和任何验证或约束。
应该就是 所有 前端传进来的 数据 都会在这里 进行 过滤格式之类的，然后再根据
*/

/* 
在 MERN（MongoDB、Express、React、Node.js）应用程序中，mongoose是一个提供与 MongoDB 数据库交互方式的库。要与 MongoDB 中的数据交互，您需要定义数据模式，然后基于该模式创建 Mongoose 模型。

在给定的代码中，Cart是 Mongoose 模型的名称。该mongoose.model()方法为具有特定模式的特定数据库集合创建新模型。该方法的第一个参数mongoose.model()是模型的名称，用于在您的应用程序中引用该模型。第二个参数是定义要存储在数据库中的数据结构的模式。

因此，mongoose.model('Cart', cartSchema)创建一个名为 的新 Mongoose 模型Cart，它将与名为 的 MongoDB 集合进行交互carts。cartSchema是集合的架构carts。

一旦定义了 Mongoose 模型，就可以使用它与数据库进行交互。.find()您可以使用、.findOne()、.create()、.updateOne()等方法.deleteOne()来查询、创建、更新或删除数据库中的数据。

In a MERN (MongoDB, Express, React, Node.js) application, mongoose is a library that provides a way to interact with a MongoDB database. To interact with data in MongoDB, you need to define a data schema and then create a Mongoose model based on that schema.

In the given code, Cart is the name of the Mongoose model. The mongoose.model() method creates a new model for a specific database collection with a specific schema. The first argument of the mongoose.model() method is the name of the model, which is used to reference the model in your application. The second argument is the schema that defines the structure of the data to be stored in the database.

So, mongoose.model('Cart', cartSchema) creates a new Mongoose model called Cart that will interact with the MongoDB collection named carts. cartSchema is the schema for the carts collection.

Once you have a Mongoose model defined, you can use it to interact with the database. You can use methods like .find(), .findOne(), .create(), .updateOne(), .deleteOne() and more to query, create, update, or delete data in the database.

*/
