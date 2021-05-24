#!/usr/bin/env bash

# Run the command `chmod +x ./install-hooks.bash` in the scripts directory

GIT_DIR=$(git rev-parse --git-dir)

chmod +x pre-commit.py commit-msg.py pre-push.bash post-checkout.py

echo "Installing hooks..."
# symlinks to the pre-commit script
ln -sf $GIT_DIR/../git-hooks/pre-commit.py $GIT_DIR/hooks/pre-commit
ln -sf $GIT_DIR/../git-hooks/commit-msg.py $GIT_DIR/hooks/commit-msg
ln -sf $GIT_DIR/../git-hooks/pre-push.bash $GIT_DIR/hooks/pre-push
ln -sf $GIT_DIR/../git-hooks/post-checkout.py $GIT_DIR/hooks/post-checkout
echo "Done!"
