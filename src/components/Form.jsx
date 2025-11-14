// src/components/Form.jsx
const Form = ({ title, onSubmit, children, btnText, isLoading = false }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(e); // panggil parent handler
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ minHeight: "95vh" }}
        >
            <div className="row w-100 justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {children}
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-3"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            {' '}Loading...
                                        </>
                                    ) : (
                                        btnText
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Form;