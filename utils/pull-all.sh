#!/bin/bash

# Fetch all remote branches
git fetch --all

# Loop through each remote branch
for branch in $(git branch -r | grep -v '\->' | sed 's/origin\///'); do
  # Check if the local branch exists
  if ! git show-ref --verify --quiet refs/heads/$branch; then
    # Create the local branch and set it to track the remote branch
    git checkout -b $branch origin/$branch
  else
    # Checkout the existing local branch
    git checkout $branch
  fi
  # Pull the latest changes
  git pull origin $branch
done