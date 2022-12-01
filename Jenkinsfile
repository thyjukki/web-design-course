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
      when {
        branch 'main'
      }
      steps {
        script {
          docker.withRegistry('https://nexus.jukk.it', 'nexus-jenkins-user' ) {
            clientImage.push("${BUILD_NUMBER}")            
            clientImage.push("latest") 
            serverImage.push("${BUILD_NUMBER}") 
            serverImage.push("latest") 
          }
        }
      }
    }
    stage("Deploy") {
      when {
        branch 'main'
      }
      steps {
          withCredentials([string(credentialsId: 'caprover-password', variable: 'CAPROVER_PASSWORD')]) {
              sh "caprover deploy -c captain-definition-client"
              sh "caprover deploy -c captain-definition-server"
          }
        }
      }
    }
  }
}