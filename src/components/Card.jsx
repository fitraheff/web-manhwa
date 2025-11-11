const Card = ({ title, children, image }) => {
    return (
        <div className="card card-manhwa" style={{ width: "18rem" }}>
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{children}</p>
            </div>
        </div>
    );
};

export default Card;
