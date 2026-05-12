import Spinner from 'react-bootstrap/Spinner';

function loader() {
    return (
        <>
            <td colSpan="8" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </td>

        </>
    );
}

export default loader;