const TestingPage = () => {
  const imgStyle = {
    height: 560,
    width: 650,
  };

  const fileId = "1DnsHPgRR547ujCXd3Bu2E1YG5_LyRVJv", // "13yp7uNHnFxdDU7nuPGlx5vZUe3nFBZOX",
    pdf = "1GZFOaj_xfSysCAPxhCWk2mnk11iMKshx";

  const dropboxPDF =
    "https://www.dropbox.com/scl/fi/h22tpybcv9c5jib2o6d3y/dummy.pdf?rlkey=rpsa4g4jb7vuke4uua8kwbl34&dl=0";
  const downloadImg = `https://drive.google.com/uc?id=${pdf}&export=download`;
  const thumbnail = `https://drive.google.com/thumbnail?id=${fileId}`;
  const dropboxDwld =
    "https://www.dropbox.com/scl/fi/ond9l04lrzn4m7onij0qh/CM-TECHNOLOGIES-INDIA-LinkedIn-Banner-2024.png?rlkey=clntp3pqg96sx91u7jbw7gd3p&dl=1";

  const aus =
    "https://www.dropbox.com/scl/fi/ond9l04lrzn4m7onij0qh/CM-TECHNOLOGIES-INDIA-LinkedIn-Banner-2024.png?rlkey=clntp3pqg96sx91u7jbw7gd3p&raw=1";
  // "https://www.dropbox.com/scl/fi/ond9l04lrzn4m7onij0qh/CM-TECHNOLOGIES-INDIA-LinkedIn-Banner-2024.png?rlkey=clntp3pqg96sx91u7jbw7gd3p&dl=0";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p>Testing Page</p>
      <img
        src={thumbnail}
        className=""
        style={imgStyle}
        alt="Dropbox Img Not Avaliable"
        onError={(e) => {
          console.log("Err in img: ", e);
        }}
      />
      <div>
        <a
          href={downloadImg}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Attachment
        </a>
      </div>
      <div>
        <a href={dropboxPDF} download target="_blank" rel="noopener noreferrer">
          Aus Download Attachment
        </a>
      </div>
    </div>
  );
};

export default TestingPage;
