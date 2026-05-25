Feature: App Initialization
  As a user
  I want the app to load successfully
  So that I can use the application

  Scenario: App loads and displays welcome message
    Given the app is open
    Then I should see "Bem-vindo ao KMBR" text
