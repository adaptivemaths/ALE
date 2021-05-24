#!/usr/bin/python3

import sys
import re
from colorama import Fore, Back, Style


def exit_failure(error_message):
    print(Fore.RED + Style.BRIGHT + "fatal: " + error_message + Style.RESET_ALL)
    print("-------------------------------")
    sys.exit(1)


def follows_convention(first_line):
    # located in the README
    types = ["feat", "fix", "style", "refactor",
             "perf", "test", "docs", "chore", "build", "ci"]
    if all([re.match(t + "(\S+): ", first_line) == None for t in types]):
        exit_failure("commit message does not follow convention.")
    if len(first_line) > 50:
        exit_failure("header is longer than 50 characters.")


def co_authors(last_line):
    # members of DRP-13
    authors = {"A": "Co-authored-by: Abdur <rahim@shariftextiles.com>\n",
               "D": "Co-authored-by: Devam <devamsavjani@rocketmail.com>\n",
               "J": "Co-authored-by: Jaimi <jaimip34@gmail.com>\n",
               "R": "Co-authored-by: Rohan <rohananandpandit@gmail.com>\n"}
    line = last_line.strip("\n").split(" ")
    print(Fore.GREEN + Style.BRIGHT +
          "Replacing name(s) with co-author(s)" + Style.RESET_ALL)
    for i in range(1, len(line)):
        line[i] = authors[line[i]]
    # return updated authors without "W/"
    return "\n".join(line[1:])


def read_commit_msg(file):
    new_commit_message = []
    with open(file, "r") as fp:
        lines = fp.readlines()
        follows_convention(lines[0])
        for line in lines:
            # ignore comments
            if line[0] == "#":
                continue
            l = line
            # co-author alias
            if line.startswith("W/"):
                l = co_authors(line)
            new_commit_message.append(l)
    fp.close()
    with open(file, "w") as fp:
        fp.writelines(new_commit_message)
    fp.close()
    return new_commit_message


def main():
    print("--- Running commit-msg hook ---")
    file = sys.argv[1]
    read_commit_msg(file)
    print(Fore.GREEN + Style.BRIGHT +
          "commit-msg hook finished successfully." + Style.RESET_ALL)
    print("-------------------------------")
    sys.exit(0)


if __name__ == "__main__":
    main()
