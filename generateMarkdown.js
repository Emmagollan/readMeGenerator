function generateMarkdown(userResponses, userInfo) {

  
  let draftToC = `
  ## Table of Contents`;
  
  if (userResponses.installation !== '') { draftToC += `
  * [Installation](#installation)` };
  
  if (userResponses.usage !== '') { draftToC += `
  * [Usage](#usage)` };
  
  if (userResponses.contributing !== '') { draftToC += `
  * [Contributing](#contributing)` };
  
  if (userResponses.tests !== '') { draftToC += `
  * [Tests](#tests)` };
  
  let draftMarkdown = 
  `# ${userResponses.title}
  
  ## Description 
    
  ${userResponses.description}
  
  `
  // Add Table of Contents to markdown
  draftMarkdown += draftToC;
   
  // Add License section since License is required to Table of Contents
  draftMarkdown += `
  * [License](#license)`;
    
  // Optional Installation section
  if (userResponses.installation !== '') {
    
  draftMarkdown +=
  `
    
  ## Installation
    
  ${userResponses.installation}`
    };
    
  
  // Optional Usage section
  if (userResponses.usage !== '') {
    
  draftMarkdown +=
  
  `
    
  ## Usage 
    
  ${userResponses.usage}`
    };
    
    
    // Contributing section
  if (userResponses.contributing !== '') {
  `
    
  ## Contributions
    
  *If you would like to contribute, please follow these guidlines:*
    
  ${userResponses.contributing}`
    };
    
  
  // Tests section
  if (userResponses.tests !== '') {
    
  draftMarkdown +=
  `
    
  ## Tests
    
  ${userResponses.tests}`
    };
  
  
    // License section is required
  draftMarkdown +=
  `
    
  ## License
    
  ${userResponses.license}
  `;
  
  
  // Questions
  let draftDev = 
  `
    
  ## Questions?
    
  For any questions, please contact me with the information below:
   
  GitHub: [@${userInfo.login}](${userInfo.url})
    `;
  
    // If GitHub email is not null, add to Developer section
    if (userInfo.email !== null) {
    
    draftDev +=
    `
  
  Email: ${userInfo.email}
  
    `};
  
    // Add developer section to markdown
    draftMarkdown += draftDev;
  
    // Return markdown
    return draftMarkdown;
    
  }
  
  module.exports = generateMarkdown;
  