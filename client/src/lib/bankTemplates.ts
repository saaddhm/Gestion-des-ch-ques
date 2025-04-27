// Bank template definitions
interface BankTemplateProps {
  logo: string;
  name: string;
  background: string;
  textColor: string;
  beneficiaryPosition: {
    top: string;
    left: string;
  };
  amountPosition: {
    top: string;
    right: string;
  };
  amountWordsPosition: {
    top: string;
    left: string;
  };
  placeAndDatePosition: {
    bottom: string;
    right: string;
  };
  signaturePosition: {
    bottom: string;
    right: string;
  };
}

const createBankTemplate = (bank: string): BankTemplateProps => {
  switch (bank) {
    case "attijariwafa":
      return {
        logo: "https://play-lh.googleusercontent.com/zgOpMMUPBhc10hGOVPQ6LjFVY4ZwaVyh5D2LA7xSg8Y1rx6NyOXD0rILBi2CZEOYz-k",
        name: "ATTIJARIWAFA BANK",
        background: "#FAFBFC",
        textColor: "#333333",
        beneficiaryPosition: {
          top: "85px",
          left: "40px",
        },
        amountPosition: {
          top: "125px",
          right: "40px",
        },
        amountWordsPosition: {
          top: "150px",
          left: "40px",
        },
        placeAndDatePosition: {
          bottom: "40px",
          right: "60px",
        },
        signaturePosition: {
          bottom: "20px",
          right: "40px",
        },
      };
    case "bp":
      return {
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7IHrr2jz3C6uCXc4qYCPrIO-cv1gz62gEg&s",
        name: "BANQUE POPULAIRE",
        background: "#F8F9FC",
        textColor: "#28365E",
        beneficiaryPosition: {
          top: "80px",
          left: "38px",
        },
        amountPosition: {
          top: "120px",
          right: "35px",
        },
        amountWordsPosition: {
          top: "145px",
          left: "38px",
        },
        placeAndDatePosition: {
          bottom: "38px",
          right: "55px",
        },
        signaturePosition: {
          bottom: "18px",
          right: "35px",
        },
      };
    case "bmce":
      return {
        logo: "https://www.ir-bankofafrica.ma/sites/default/files/styles/actualite/public/default_images/imgpsh_fullsize_anim.png?itok=UUjnntlS",
        name: "BMCE BANK",
        background: "#F7FAFB",
        textColor: "#236192",
        beneficiaryPosition: {
          top: "90px",
          left: "42px",
        },
        amountPosition: {
          top: "130px",
          right: "45px",
        },
        amountWordsPosition: {
          top: "155px",
          left: "42px",
        },
        placeAndDatePosition: {
          bottom: "42px",
          right: "65px",
        },
        signaturePosition: {
          bottom: "22px",
          right: "45px",
        },
      };
    case "cih":
      return {
        logo: "https://www.maghrebtitrisation.ma/sites/default/files/news/2022-01/cih-logo.jpg",
        name: "CIH BANK",
        background: "#FBF9F7",
        textColor: "#6B3A1E",
        beneficiaryPosition: {
          top: "82px",
          left: "36px",
        },
        amountPosition: {
          top: "122px",
          right: "32px",
        },
        amountWordsPosition: {
          top: "147px",
          left: "36px",
        },
        placeAndDatePosition: {
          bottom: "36px",
          right: "52px",
        },
        signaturePosition: {
          bottom: "16px",
          right: "32px",
        },
      };
    case "sgm":
      return {
        logo: "https://t4.ftcdn.net/jpg/04/68/63/63/360_F_468636385_51YiXDtzZQgutRP8g6OBTOrxAWrrWh3f.jpg",
        name: "SOCIÉTÉ GÉNÉRALE MAROC",
        background: "#F9F8FA",
        textColor: "#E62C29",
        beneficiaryPosition: {
          top: "88px",
          left: "44px",
        },
        amountPosition: {
          top: "128px",
          right: "48px",
        },
        amountWordsPosition: {
          top: "153px",
          left: "44px",
        },
        placeAndDatePosition: {
          bottom: "44px",
          right: "68px",
        },
        signaturePosition: {
          bottom: "24px",
          right: "48px",
        },
      };
    default:
      // Default template (fallback to Attijariwafa)
      return {
        logo: "https://upload.wikimedia.org/wikipedia/fr/1/1d/Logo_AWB.svg",
        name: "ATTIJARIWAFA BANK",
        background: "#FAFBFC",
        textColor: "#333333",
        beneficiaryPosition: {
          top: "85px",
          left: "40px",
        },
        amountPosition: {
          top: "125px",
          right: "40px",
        },
        amountWordsPosition: {
          top: "150px",
          left: "40px",
        },
        placeAndDatePosition: {
          bottom: "40px",
          right: "60px",
        },
        signaturePosition: {
          bottom: "20px",
          right: "40px",
        },
      };
  }
};

export default createBankTemplate;