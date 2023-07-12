import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import {
  changeCategory,
  setValuesForAttrFromDbSelectForm,
  setAttributesTableWrapper,
} from "./utils/utils";

const CreateProductPageComponent = ({
  createProductApiRequest,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
  categories,
  reduxDispatch,
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
}) => {
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [images, setImages] = useState(false);
  const [pdfs, setPdfs] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [isCreatingPdf, setIsCreatingPdf] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category");

  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  // add new product attrs in Stock
  const [rowCount, setRowCount] = useState(1);
  const handleNewProduct = () => {
    setRowCount(rowCount + 1);
  };
  const handleRemoveProduct = () => {
    setRowCount(rowCount - 1);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const stock = [];
    for (
      let i = 0;
      i < document.querySelectorAll(".text-primary").length;
      i++
    ) {
      const count = document.getElementsByName(`count-${i}`)[0].value;
      const price = document.getElementsByName(`price-${i}`)[0].value;
      const attrs = document.getElementsByName(`attrs-${i}`)[0].value;
      const barcode = document.getElementsByName(`barcode-${i}`)[0].value;
      const ctlsku = document.getElementsByName(`ctlsku-${i}`)[0].value;
      const slrsku = document.getElementsByName(`slrsku-${i}`)[0].value;
      const suppliersku = document.getElementsByName(`suppliersku-${i}`)[0]
        .value;

      stock.push({
        count,
        price,
        attrs,
        barcode,
        ctlsku,
        slrsku,
        suppliersku,
      });
    }

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      saleunit: form.saleunit.value,
      max: form.Max.value,
      purchaseprice: form.PurchasePrice.value,
      slrcurrentbuyingprice: form.SLRCurrentBuyingPrice.value,
      supplier: form.supplier.value,
      category: categoryChoosen,
      attributesTable: attributesTable,
      stock: stock,
    };
    if (event.currentTarget.checkValidity() === true) {
      if (images.length > 9) {
        setIsCreating("to many files");
        return;
      }
      createProductApiRequest(formInputs)
        .then((data) => {
          if (images) {
            // 如果是===就是test cloudnary的上传，如果是!== 就是测试local
            // !===只存在于 三个文件里(edit / create component 以及 editPage)
            if (process.env.NODE_ENV === "dev") {
              // TODO: change to !==  ===
              uploadImagesApiRequest(images, data.productId)
                .then((res) => { })
                .catch((er) =>
                  setIsCreating(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadImagesCloudinaryApiRequest(images, data.productId);
            }
          }
          if (pdfs) {
            // 如果是===就是test cloudnary的上传，如果是!== 就是测试local
            // !===只存在于 三个文件里(edit / create component 以及 editPage)
            if (process.env.NODE_ENV === "dev") {
              // to do: change to !==
              uploadPdfApiRequest(pdfs, data.productId)
                .then((res) => { })
                .catch((er) =>
                  setIsCreatingPdf(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadPdfCloudinaryApiRequest(pdfs, data.productId);
            }
          }
          if (data.message === "product created") navigate("/admin/products");
        })
        .catch((er) => {
          setCreateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
      // console.log(formInputs);
    }

    setValidated(true);
  };

  /*   const uploadHandlerImage = (images) => {
    setImages(images);
  }; */
  const uploadHandlerImage = (e) => {
    setImages(e.target.files);
  };

  const uploadHandlerPdf = (pdfs) => {
    setPdfs(pdfs);
  };

  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      reduxDispatch(newCategory(e.target.value.toUpperCase()));
      setTimeout(() => {
        let element = document.getElementById("cats");
        setCategoryChoosen(e.target.value);
        element.value = e.target.value;
        e.target.value = "";
      }, 200);
    }
  };

  const deleteCategoryHandler = () => {
    let element = document.getElementById("cats");
    reduxDispatch(deleteCategory(element.value));
    setCategoryChoosen("Choose category");
  };

  const [searchTerm, setSearchTerm] = useState("");

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
        );
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };
  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const displayImages = () => {
    return (
      images &&
      Array.from(images).map((image, index) => (
        <img
          src={URL.createObjectURL(image)}
          key={index}
          alt="Selected"
          style={{ margin: "2px", width: "19%", height: "auto" }}
        />
      ))
    );
  };

  const [selectedCategory, setSelectedCategory] = useState("");


  // console.log(categoryChoosen);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Create a new product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>

            {[...Array(rowCount)].map((_, index) => (
              <>
                <span className="text-primary">Product: {index + 1}</span>
                <Row>
                  <React.Fragment key={index}>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicCount-${index}`}
                    >
                      <Form.Label>Count</Form.Label>
                      <Form.Control
                        name={`count-${index}`}
                        required
                        type="number"
                        value="300"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mb-3"
                      controlId={`formBasicAttrs-${index}`}
                    >
                      <Form.Label>Attrs</Form.Label>
                      <Form.Control
                        name={`attrs-${index}`}
                        required
                        type="text"

                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mb-3"
                      controlId={`formBasicBarcde-${index}`}
                    >
                      <Form.Label>Barcode</Form.Label>
                      <Form.Control name={`barcode-${index}`} type="text" />
                    </Form.Group>
                    <Form.Group as={Col} md="1" className="mb-3">
                      <i
                        className="bi bi-trash mt-3"
                        onClick={handleRemoveProduct}
                        style={{
                          cursor: "pointer",
                        }}
                      ></i>
                    </Form.Group>
                  </React.Fragment>
                </Row>
                <Row>
                  <React.Fragment key={index}>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicPrice-${index}`}
                    >
                      <Form.Label>Product Price</Form.Label>
                      {/*                       <CurrencyInput
                        className={`form-control price-${index}`}
                        name={`price-${index}`}
                        placeholder="AUD 0.00"
                        defaultValue="0"
                        decimalsLimit={2}
                        required="true"
                        disableGroupSeparators="true"
                      /> */}
                      <Form.Control
                        name={`price-${index}`}
                        required
                        type="number"
                        step="0.001"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicSLRSKU-${index}`}
                    >
                      <Form.Label>SLR SKU</Form.Label>
                      <Form.Control
                        name={`slrsku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicCTLSKU-${index}`}
                    >
                      <Form.Label>CTL SKU</Form.Label>
                      <Form.Control
                        name={`ctlsku-${index}`}
                        required
                        type="text"
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      className="mb-3"
                      controlId={`formBasicSupplierSKU-${index}`}
                    >
                      <Form.Label>Supplier SKU</Form.Label>
                      <Form.Control
                        name={`suppliersku-${index}`}
                        required
                        type="text"

                      />
                    </Form.Group>
                  </React.Fragment>
                </Row>
              </>
            ))}
            <hr />
            <p
              onClick={handleNewProduct}
              style={{
                cursor: "hand",
                textAlign: "center",
                fontStyle: "italic",

              }}
            >
              Add a New Product
            </p>
            <hr />

            <Row>
              <Form.Group
                as={Col}
                md="4"
                className="mb-3"
                controlId="formBasicPurchasePrice"
              >
                <Form.Label>Purchase Price</Form.Label>
                {/*                 <CurrencyInput
                  className={`form-control PurchasePrice`}
                  name={`PurchasePrice`}
                  placeholder="AUD 0.00"
                  defaultValue="0"
                  decimalsLimit={2}
                  required="true"
                  disableGroupSeparators="true"
                /> */}
                <Form.Control name="PurchasePrice" required type="text" step="0.01" />
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className="mb-3"
                controlId="formBasicSLRBuyingPrice"
              >
                <Form.Label>SLR Buying Price</Form.Label>
                {/*                 <CurrencyInput
                  className={`form-control SLRCurrentBuyingPrice`}
                  name={`SLRCurrentBuyingPrice`}
                  placeholder="AUD 0.00"
                  defaultValue="0"
                  decimalsLimit={2}
                  required="true"
                  disableGroupSeparators="true"
                /> */}
                <Form.Control name="SLRCurrentBuyingPrice" type="text" step="0.01" />
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className="mb-3"
                controlId="formBasicSupplier"
              >
                <Form.Label>Supplier</Form.Label>
                <Form.Control name="supplier" required type="text" />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicSaleunit"
              >
                <Form.Label>Sale Unit</Form.Label>
                <Form.Control name="saleunit" type="text" value="100" />
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicMax"
              >
                <Form.Label>Max</Form.Label>
                <Form.Control name="Max" required type="text" value="400" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                <CloseButton onClick={deleteCategoryHandler} />(
                <small>remove selected</small>)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Form.Select
                id="cats"
                required
                name="category"
                aria-label="Default select example"
                onChange={(e) =>
                  changeCategory(
                    e,
                    categories,
                    setAttributesFromDb,
                    setCategoryChoosen
                  )
                }
              >
                <option value="">Choose category</option>
                {categories
                  .filter((category) =>
                    category.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((category, idx) => (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. PPE/HAT/PARTS, then press Enter,
                and use above choose that created category){" "}
              </Form.Label>
              <Form.Control
                onKeyUp={newCategoryHandler}
                name="newCategory"
                type="text"
              />
            </Form.Group>

            {/* {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={(e) =>
                        setValuesForAttrFromDbSelectForm(
                          e,
                          attrVal,
                          attributesFromDb
                        )
                      }
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </React.Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      onChange={attributeValueSelected}
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )} */}

            {/* <Row>
              {attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttribute(item.key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row> */}

            {/* <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    ref={createNewAttrKey}
                    disabled={["", "Choose category"].includes(categoryChoosen)}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrKeyHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    ref={createNewAttrVal}
                    disabled={["", "Choose category"].includes(categoryChoosen)}
                    placeholder="first choose or create category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row> */}

            {/* <Alert show={newAttrKey && newAttrValue} variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert> */}

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              {/* ********* Image upload ********* */}
              <Form.Label>Images</Form.Label>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                {displayImages()}
              </div>

              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => {
                  uploadHandlerImage(e);
                  displayImages();
                }}
              />
              {isCreating}
              {/* ********* Description PDF ********* */}
              <br />
              <Form.Label>Description PDF</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => uploadHandlerPdf(e.target.files)}
              />
              {isCreatingPdf}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>

            <Link to="/admin/products" className="btn btn-secondary ms-5">
              Cancel
            </Link>
            <p></p>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPageComponent;
