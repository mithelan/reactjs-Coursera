import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import DishdetailComponent from "./DishdetailComponent";

class MenuComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }



    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div  className="col-12 col-md-5 m-1">
                    <Card key={dish.id}
                          onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <DishdetailComponent dish={this.state.selectedDish}> </DishdetailComponent>

                    </div>
                </div>
            </div>
        );
    }
}

export default MenuComponent;
