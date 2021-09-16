cd ${TRAVIS_BUILD_DIR}
sed -i -e "s|\"version\": \"\([0-9]\{1,2\}\).\([0-9]\{1,2\}\).*\"|\"version\": \"\1.\2.${TRAVIS_BUILD_NUMBER}\"|g" $TRAVIS_BUILD_DIR/package.json;

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | sed 's/ //g')

echo $PACKAGE_VERSION

if [ "${TRAVIS_BRANCH}" == "master" ]; then
  REPO=gcr.io/${PROD_PROJECT_ID}/${APP_NAME}:${PACKAGE_VERSION}
  echo ${REPO}
  docker build -t ${APP_NAME} ${TRAVIS_BUILD_DIR}
  docker tag ${APP_NAME} ${REPO}
  docker push ${REPO}
  $HOME/google-cloud-sdk/bin/kubectl set image deployment/demo-k8s-prod-web eos-lynx-dapps=${REPO}
else
  REPO=gcr.io/${STAGING_PROJECT_ID}/${APP_NAME}:${PACKAGE_VERSION}
  echo ${REPO}
  docker build -t ${APP_NAME} ${TRAVIS_BUILD_DIR}/
  docker tag ${APP_NAME} ${REPO}
  docker push ${REPO}
  $HOME/google-cloud-sdk/bin/kubectl set image deployment/demo-k8s-web eos-lynx=${REPO}
fi
