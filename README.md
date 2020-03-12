# JumpCloudActions

This library class has the following two functions:
  - addAction(string) throws Error

    - Accepts a JSON serialized string of the form below:
    
        {"action":"jump", "time":100}
    - Actions may be from 1 to 20 characters long and can only contain upper or lower case English characters
    - Time may not be negative
    - Case does not matter for action names.  i.e.: "Jump" and "jump" are the same and will be stored as "jump"
  - getStats() returns String
  
    - Returns a serialized JSON array of the average time for each action that was provided to the addAction function.
    - Sample output:
    
        [{"action":"jump", "avg":150},{"action":"run", "avg":75}]
        
        
# Installation/Running Instructions

Requirements:

  - Node.js v12.16.1 (other versions may work, but this is the only tested version)
  - npm 6.13.4 (other versions may work, but this is the only tested version)
  
To download and use this project use the command line tool of your choice to do the following:

    1. clone git repo to your local machine
    2. from within the repo directory, run 'npm install'
    3. run: 'npm test' to run the unit tests or 'node ActionAveragerExampleUsage.js' to run the example script
