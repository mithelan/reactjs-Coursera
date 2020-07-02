import React from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {Link} from 'react-router-dom'

function RenderDish({dish}) {

    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
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


   function RenderComments({comments}) {
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

                </ul>
            </div>
        )
    }




const DishdetailComponent = (props) => {
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


export default DishdetailComponent;
