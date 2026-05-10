import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';

function run() {
  core.notice('Deploying to AWS S3...');

  const bucketName = core.getInput('bucket-name', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const sourceDir = core.getInput('source-dir', { required: true });
  
  const s3Uri = `s3://${bucketName}`;
  exec.exec(`aws s3 sync ${sourceDir} ${s3Uri} --region ${bucketRegion}`)
    .then(() => {
      core.notice('Deployment successful!');
    })
    .catch((error) => {
      core.error(`Deployment failed: ${error.message}`);
    });
};

run();