Feature: Submit feedback

  In order to share my attitude towards the support request
  As a User
  I want to be able to submit my feedback

  Scenario: Default
  Given User opened the page
  Then User is unable to submit the feedback

  Scenario: Select only 1 option
  Given User opened the page
  Then User can select only 1 feedback option

  Scenario: Remove option selection
  Given User selected a feedback option
  When User selects this option again
  Then System unselects the option

  Scenario: Change option selection
  Given User selected an option
  When User selects another option
  Then System unselects the 1st option
  And System selects the chosen option

  Scenario: Submit feedback
  Given User selected 1 feedback option
  When User intiates submitting of the feedback
  Then System shows the result screen

