// Function to convert numbers to words in French
export function convertToFrenchWords(amount: number): string {
  if (amount === 0) return "Zéro dirhams";

  const units = [
    "", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
    "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", 
    "dix-sept", "dix-huit", "dix-neuf"
  ];
  
  const tens = [
    "", "", "vingt", "trente", "quarante", "cinquante", "soixante", 
    "soixante-dix", "quatre-vingt", "quatre-vingt-dix"
  ];

  const amountStr = amount.toFixed(2);
  const [wholePart, decimalPart] = amountStr.split('.');
  const wholeNum = parseInt(wholePart);
  const decimalNum = parseInt(decimalPart);

  function convertLessThanOneThousand(num: number): string {
    if (num === 0) return "";
    
    if (num < 20) {
      return units[num];
    }
    
    if (num < 100) {
      const unit = num % 10;
      const ten = Math.floor(num / 10);
      
      if (ten === 7 || ten === 9) {
        return tens[ten - 1] + "-" + (ten === 7 && unit === 1 ? "et-" : "") + units[10 + unit];
      }
      
      return tens[ten] + (unit > 0 ? (unit === 1 && ten !== 8 ? "-et-" : "-") + units[unit] : "");
    }
    
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    
    return (hundred === 1 ? "cent" : units[hundred] + " cent") + 
           (remainder > 0 ? " " + convertLessThanOneThousand(remainder) : "");
  }

  function convertNumber(num: number): string {
    if (num === 0) return "";
    
    // Convert numerals less than 1000
    if (num < 1000) {
      return convertLessThanOneThousand(num);
    }
    
    // For thousands
    if (num < 1000000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      
      return (thousands === 1 ? "mille" : convertLessThanOneThousand(thousands) + " mille") +
             (remainder > 0 ? " " + convertNumber(remainder) : "");
    }
    
    // For millions
    if (num < 1000000000) {
      const millions = Math.floor(num / 1000000);
      const remainder = num % 1000000;
      
      return (millions === 1 ? "un million" : convertLessThanOneThousand(millions) + " millions") +
             (remainder > 0 ? " " + convertNumber(remainder) : "");
    }
    
    // For billions
    const billions = Math.floor(num / 1000000000);
    const remainder = num % 1000000000;
    
    return (billions === 1 ? "un milliard" : convertLessThanOneThousand(billions) + " milliards") +
           (remainder > 0 ? " " + convertNumber(remainder) : "");
  }

  let result = convertNumber(wholeNum);
  
  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  // Add 'dirhams'
  result += " dirham" + (wholeNum !== 1 ? "s" : "");
  
  // Add cents if needed
  if (decimalNum > 0) {
    result += " et " + convertNumber(decimalNum) + " centime" + (decimalNum !== 1 ? "s" : "");
  }
  
  return result;
}

// Function to convert numbers to words in Arabic
export function convertToArabicWords(amount: number): string {
  if (amount === 0) return "صفر درهم";

  const units = [
    "", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة"
  ];
  
  const feminine_units = [
    "", "واحدة", "اثنتان", "ثلاث", "أربع", "خمس", "ست", "سبع", "ثمان", "تسع", "عشر"
  ];
  
  const tens = [
    "", "عشر", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"
  ];
  
  const hundreds = [
    "", "مائة", "مئتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"
  ];
  
  const thousands = ["", "ألف", "ألفان", "آلاف", "ألف"];
  
  const amountStr = amount.toFixed(2);
  const [wholePart, decimalPart] = amountStr.split('.');
  const wholeNum = parseInt(wholePart);
  const decimalNum = parseInt(decimalPart);

  function getArabicTensCompound(num: number): string {
    if (num <= 10) return feminine_units[num];
    
    if (num < 20) {
      return feminine_units[num - 10] + " " + tens[1];
    }
    
    const unit = num % 10;
    const ten = Math.floor(num / 10);
    
    if (unit === 0) return tens[ten];
    return feminine_units[unit] + " و " + tens[ten];
  }

  function handleHundreds(num: number): string {
    if (num < 100) return getArabicTensCompound(num);
    
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    
    if (remainder === 0) return hundreds[hundred];
    return hundreds[hundred] + " و " + getArabicTensCompound(remainder);
  }

  function handleThousands(num: number): string {
    if (num < 1000) return handleHundreds(num);
    
    const thousand = Math.floor(num / 1000);
    const remainder = num % 1000;
    
    let result = "";
    
    if (thousand === 1) {
      result = thousands[1];
    } else if (thousand === 2) {
      result = thousands[2];
    } else if (thousand >= 3 && thousand <= 10) {
      result = units[thousand] + " " + thousands[3];
    } else {
      result = handleHundreds(thousand) + " " + thousands[4];
    }
    
    if (remainder === 0) return result;
    return result + " و " + handleHundreds(remainder);
  }

  let result = handleThousands(wholeNum);
  
  // Add 'dirhams'
  const dirhamWord = wholeNum === 1 ? "درهم" : 
                     wholeNum === 2 ? "درهمان" : 
                     (wholeNum >= 3 && wholeNum <= 10) ? "دراهم" : "درهما";
  
  result += " " + dirhamWord;
  
  // Add cents if needed
  if (decimalNum > 0) {
    const centWord = decimalNum === 1 ? "سنتيم" : 
                     decimalNum === 2 ? "سنتيمان" : 
                     (decimalNum >= 3 && decimalNum <= 10) ? "سنتيمات" : "سنتيما";
                     
    result += " و " + handleHundreds(decimalNum) + " " + centWord;
  }
  
  return result;
}
