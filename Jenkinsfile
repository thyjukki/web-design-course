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
          withCredentials([sshUserPrivateKey(credentialsId: 'sisu2-production-server', usernameVariable: 'SSH_USERNAME', keyFileVariable: 'SSH_KEY_PATH')]) {
          script {
            def remote = [name: 'sshgateway', host: '192.168.2.121', user: SSH_USERNAME, allowAnyHosts: true, identityFile: SSH_KEY_PATH]
            sshPut remote: remote, from: 'scripts/deploy-client.sh', into: '.'
            sshPut remote: remote, from: 'scripts/deploy-server.sh', into: '.'
            sshCommand remote: remote, command: "chmod a+x ./deploy-client.sh && ./deploy-client.sh ${BUILD_NUMBER}"
            sshCommand remote: remote, command: "chmod a+x ./deploy-server.sh && ./deploy-server.sh ${BUILD_NUMBER}"
          }
        }
      }
    }
  }
}