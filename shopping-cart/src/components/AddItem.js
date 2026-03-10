import React from "react";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productPrice: 0,
    };
  }
  state = {};

  render() {
    return (
      <form
        className="row mb-5 align-items-end"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.addItem(
            this.state.productName,
            Number(this.state.productPrice),
          );
        }}
      >
        <div className="col-4">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="productName"
            onChange={(e) => {
              this.setState({ productName: e.currentTarget.value });
            }}
            value={this.state.productName}
          />
        </div>

        <div className="col-4">
          <label htmlFor="inputPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="inputPrice"
            name="productPrice"
            onChange={(e) => {
              this.setState({ productPrice: Number(e.currentTarget.value) });
            }}
            value={this.state.productPrice}
          />
        </div>

        <div className="col-4">
          <button type="submit" className="btn btn-primary col-3">
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default AddItem;
