import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishdetailComponent extends Component {

    renderComments(comments) {
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



    renderDish(dish) {
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
    render() {
        const dish=this.props.dish

        if(dish==null){
            return(<div></div>)
        }

        const dishcom=this.renderDish(dish)
        const commentcomponent=this.renderComments(dish.comments)
        return (
            <div className='row'>
                {dishcom}

                {commentcomponent}

            </div>
        );
    }
}

export default DishdetailComponent;
