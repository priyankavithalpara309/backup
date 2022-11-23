import './FirstComponent.css';

function FirstComp(){
    return(
        <div className="expense-item">
            <div>23 Nov. 2022</div>
            <div className="expense-item__description">
                <h2>Car</h2>
                <div className="expense-item__price">$ 100000</div>
            </div>
        </div>
    )
     
}

export default FirstComp;