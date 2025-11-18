const Card = ({ title, children, image, onClick, isBookmarked }) => {
    return (
        <div
            className="card card-manhwa position-relative"
            style={{ width: "18rem", cursor: "pointer" }}
            onClick={onClick}
        >
            {/* ICON BOOKMARK */}
            {isBookmarked && (
                <span
                    className="position-absolute top-0 end-0 m-2 bg-warning text-dark px-2 py-1 rounded"
                    style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                >
                    ★
                </span>
            )}

            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{children}</p>
            </div>
        </div>
    );
};

export default Card;
