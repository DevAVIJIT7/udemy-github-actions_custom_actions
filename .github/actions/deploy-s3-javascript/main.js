const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  core.info('Deploying to AWS S3...');

  const bucketName = core.getInput('bucket-name', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const sourceDir = core.getInput('source-dir', { required: true });
  
  const s3Uri = `s3://${bucketName}`;
  exec.exec(`aws s3 sync ${sourceDir} ${s3Uri} --region ${bucketRegion}`)
    .then(() => {
      core.info('Deployment successful!');
    })
    .catch((error) => {
      core.setFailed(`Deployment failed: ${error.message}`);
    });
};

run();