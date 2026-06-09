import frontPage from "../../../Image/FrontPage.jpg";
import "./frontPageImage.css";

const FrontPageImage = () => {
  const imgStyle = {
    height: 560,
    width: 650,
  };

  const fileId = "1S8C9aUU_pTJwjLgglfCdUYwsilRCf3aB";
  const driveImg = `https://drive.google.com/uc?export=view&id=${fileId}`;

  const image = () => {
    return (
      <div className="frontPage">
        <img
          src={frontPage}
          className=""
          style={imgStyle}
          alt="Google Drive Img Not Avaliable"
          onError={(e) => {
            console.log("Err in img: ", e);
          }}
        />
      </div>
    );
  };
  return <>{image()}</>;
};

export default FrontPageImage;
