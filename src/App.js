import LogoJavamaz from './Components/IMG/LogoJAVAMAZ.jpg'
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, item: "Caja de Hojas", partnumber: "0001", proveedor:"Excel", cantidadSolicitada: "0", stock: "0" },
  { id: 2, item: "Memoria USB", partnumber: "0002", proveedor:"CT Internacional", cantidadSolicitada: "0", stock: "0" },
  { id: 3, item: "Toner CF255A", partnumber: "0002", proveedor:"UNICOM", cantidadSolicitada: "0", stock: "0" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      item: "",
      partnumber: "",
      proveedor: "",
      cantidadSolicitada: "",
      stock: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].item = dato.item;
        arreglo[contador].partnumber = dato.partnumber;
        arreglo[contador].proveedor = dato.proveedor;
        arreglo[contador].cantidadSolicitada = dato.cantidadSolicitada;
        arreglo[contador].stock = dato.stock;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
          <ModalHeader>
            <div>
              <img src={LogoJavamaz} alt= ''
              style={{
                position:'square',
                width : '130px',
              }}></img>
              <label> JAVAMAZ SISTEMAS </label>
            </div> 
          </ModalHeader>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Add</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Numero de Parte</th>
                <th>Proveedor</th>
                <th>Stock</th>
                <th>Cantidad Solicitada</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.item}</td>
                  <td>{dato.partnumber}</td>
                  <td>{dato.proveedor}</td>
                  <td>{dato.stock}</td>
                  <td>{dato.cantidadSolicitada}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Item: 
              </label>
              <input
                className="form-control"
                name="item"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.item}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Numero de Parte: 
              </label>
              <input
                className="form-control"
                name="partnumber"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.partnumber}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Proveedor: 
              </label>
              <input
                className="form-control"
                name="proveedor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.proveedor}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
               stock:
              </label>
              <input
                className="form-control"
                name="stock"
                type="number"
                onChange={this.handleChange}
                value={parseInt(this.state.form.cantidadSolicitada)+parseInt(this.state.form.stock)}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad Solicitada: 
              </label>
              <input
                className="form-control"
                name="cantidadSolicitada"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.cantidadSolicitada}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Producto</h3></div>
          </ModalHeader>

          <ModalBody>
          <FormGroup>
              <label>
               Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Item: 
              </label>
              <input
                className="form-control"
                name="item"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.item}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Numero de Parte: 
              </label>
              <input
                className="form-control"
                name="partnumber"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.partnumber}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Proveedor: 
              </label>
              <input
                className="form-control"
                name="proveedor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.proveedor}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
               stock:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="number"
                value={this.state.form.cantidadSolicitada}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad Solicitada: 
              </label>
              <input
                className="form-control"
                name="cantidadSolicitada"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.cantidadSolicitada}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
