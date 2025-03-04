import React, {Component} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle, Col, Label,
    Modal, ModalBody,
    ModalHeader, Row
} from "reactstrap";
import {Link} from 'react-router-dom'
import {LocalForm,Control,Errors} from "react-redux-form";
import { Loading } from './LoadingComponent';
import {baseUrl} from "../shared/baseURL";



const required =(val) =>val&&val.length;
const maxLength = (len)=>(val)=>!(val)||(val.length<=len)
const minLength = (len)=>(val)=>(val)&&(val.length>=len)

const RenderDish=({dish})=> {

    if (dish != null)
        return(
            <Card>
                <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}


const RenderComments=({comments,postComment,dishId})=> {
    if (comments == null) {

        return (<div></div>)
    }

    const comment = comments.map(com => {

        return (
            <li key={com.id}>

                <p>{com.comment}</p>
                <p>--{com.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(com.date))}
                </p>
            </li>
        )
    })
    return(
        <div >
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {comment}
                <CommentForm dishId={dishId} postComment={postComment}
                />
            </ul>
        </div>
    )
}




const DishdetailComponent = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {

        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
else
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to='home'>Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}
                    />


                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}
class CommentForm extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            modalOpen:false
        }

        this.submitHandle = this.submitHandle.bind(this);

    }

    handleToggle=()=>
    {
        this.setState(
            {
                modalOpen:!this.state.modalOpen
            }
        )
    }

    submitHandle=(values)=>
    {
        this.handleToggle();
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment)

    }
    render() {
        return (
            <React.Fragment>
                <Button className="bg-white text-dark" onClick={this.handleToggle}><i className="fa fa-pencil fa-lg"></i>{' '}Submit Comment</Button>
                <Modal isOpen={this.state.modalOpen} toggle={this.handleToggle}>
                    <ModalHeader toggle={this.handleToggle}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.submitHandle(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                                    className="form-control"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      minLength: minLength(3), maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      className="form-control"
                                                      validators={{
                                                          required
                                                      }}
                                                      rows="6"
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required:'Comment Required'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col >
                                    <Button type="submit" color="primary" >Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


export default DishdetailComponent;
