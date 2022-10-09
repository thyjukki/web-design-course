pipeline{
  agent none
  stages{
    stage("SonarScanner"){
      agent {
        docker {
          label 'docker'
          image 'sonarsource/sonar-scanner-cli'
        }
      }
      steps{
        withSonarQubeEnv('SonarQube Jukki') {
          sh 'sonar-scanner -Dsonar.projectKey=webdesigncourse -Dsonar.sources=./client,./server'
        }
        timeout(time: 30, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}