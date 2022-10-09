def clientImage = null
def serverImage = null

pipeline{
  agent {
    label "docker"
  }
  stages{
    stage("SonarScanner") {
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
    stage("Build") {
      steps {
        script {
          clientImage = docker.build("sisu2/client", "-f ./client/Dockerfile ./client")
          serverImage = docker.build("sisu2/server", "-f ./server/Dockerfile ./server")
        }
      }
    }
    stage("Docker push") {
      steps {
        script {
          docker.withRegistry('https://nexus.jukk.it', 'nexus-jenkins-user' ) {
            clientImage.push("${BUILD_NUMBER}")
            serverImage.push("${BUILD_NUMBER}")
          }
        }
      }
    }
  }
}