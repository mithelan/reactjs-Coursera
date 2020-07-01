import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

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




    const DishdetailComponent =(props)=> {
        const dish=props.dish

        if(dish==null){
            return(<div></div>)
        }

      /*  const dishcom=this.renderDish(dish)
        const commentcomponent=this.renderComments(dish.comments)*/
        return (
            <div className='row'>
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.dish.comments}/>


            </div>
        );
    }


export default DishdetailComponent;
