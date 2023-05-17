const EnquiryNotification = () => {

    const notify = () => {
        return (
            <div className="notify d-flex justify-content-center" >
                <div className="">
                    <p className="fs-3 fw-italic">Notifications</p>
                </div>
            </div>
        )
    }
    return (
        <>
            {notify()}
        </>
    )
}

export default EnquiryNotification;