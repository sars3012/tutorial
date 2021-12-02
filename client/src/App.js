// import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import axios from './customAxios'
// import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

const axiosClient = axios('http://localhost:8081/api');
// const axiosClient = axios.create({
//   baseURL: 'http://localhost:8081/api'
// });

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        setNombreLibro: '',
        setComentario: '',
        fetchData: [],
        comentarioUpdate: ''
      }
  }

  handleStateCrear = (event) => {
    let nam = event.target.name;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }

  handleStateComentario = (event) => {
    this.setState({
      comentarioUpdate: event.target.value
    })
  }

  componentDidMount() {
    axiosClient.get("/get")
      .then((response) => {
        const result = response.data;
        this.setState({
          fetchData: result
        })
      })
  }

  submit = () => {
    axiosClient.post('/insertar', this.state)
      .then(() => { alert('Comentario de libro creado') })
    console.log(this.state)
    document.location.reload();
  }

  delete = (id) => {
    if (window.confirm("Está seguro de eliminar este registro? ")) {
      axiosClient.delete(`/borrar/${id}`)
      document.location.reload()
    }
  }

  edit = (id) => {
    axiosClient.put(`/modificar/${id}`, this.state)
    document.location.reload();
  }

  render() {
    let card = this.state.fetchData.map((val, key) => {
      return (
        <React.Fragment>
          <Card style={{ width: '18rem' }} className='m-2'>
            <Card.Body>
              <Card.Title>{val.libro_nombre}</Card.Title>
              <Card.Text>
                {val.critica}
              </Card.Text>
              <input name='comentarioUpdate' onChange={this.handleStateComentario} placeholder='Nuevo Comentario' ></input>
              <Button className='m-2' onClick={() => { this.edit(val.id) }}>Modificar</Button>
              <Button onClick={() => { this.delete(val.id) }}>Eliminar</Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      )
    })

    return (
      <div className='App'>
        <h1>Ejemplo de Aplicación React (FullStack)</h1>
        <div className='form'>
          <input name='setNombreLibro' placeholder='Ingrese Nombre del Libro' onChange={this.handleStateCrear} />
          <input name='setComentario' placeholder='Ingrese el Comentario' onChange={this.handleStateCrear} />
        </div>

        <Button className='my-2' variant="primary" onClick={this.submit}>Crear</Button> <br /><br/>

        <Container>
          <Row>
            {card}
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;