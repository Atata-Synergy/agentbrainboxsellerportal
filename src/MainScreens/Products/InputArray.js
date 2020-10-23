export const inputArray = [{
        label: "Product Name",
        isRequired: true,
        controlName: "productName",
        onChange: (text) => this.setState({ productName: text }),
        onBlur: (text) =>
            this.setState({ productNameError: this.validateInput(text) }),
        type: "text",
        errorMessage: this.state.productNameError,
    },
    {
        label: "Product Model",
        isRequired: true,
        controlName: "productModel",
        onChange: (text) => this.setState({ productModel: text }),
        onBlur: (text) =>
            this.setState({ productModelError: this.validateInput(text) }),
        type: "text",
        errorMessage: this.state.productModelError,
    },
    {
        label: "Unique SKU number",
        controlName: "productSKU",
        onChange: (text) => this.setState({ productSKU: text }),
        onBlur: (text) =>
            this.setState({ productSKUError: this.validateInput(text) }),
        type: "text",
        errorMessage: this.state.productSKUError,
    },
    {
        label: "Product Price",
        controlName: "productPrice",
        onChange: (text) => this.setState({ productPrice: text }),
        type: "number",
        errorMessage: this.state.productPriceError,
        inputCurrency: true,
        value: this.state.productPrice,
    },
    {
        label: "Product Sale Price",
        controlName: "ProductSalePrice",
        onChange: (text) => this.setState({ ProductSalePrice: text }),
        type: "text",
        errorMessage: this.state.ProductSalePriceError,
        inputCurrency: true,
        value: this.state.ProductSalePrice,
    },
    {
        label: "Product Primary Colour",
        controlName: "productColour",
        onChange: (text) => this.setState({ productColour: text }),
        onBlur: (text) =>
            this.setState({ productColourError: this.validateInput(text) }),
        type: "color",
        errorMessage: this.state.productColourError,
    },
    {
        label: "Product Description",
        controlName: "ProductDescription",
        onChange: (text) => this.setState({ ProductDescription: text }),
        onBlur: (text) =>
            this.setState({ ProductDescriptionError: this.validateInput(text) }),
        type: "color",
        componentClass: "textarea",
        errorMessage: this.state.productColourError,
    },
];