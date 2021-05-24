#!/usr/bin/python3

import sys
import os
import subprocess
from colorama import Fore, Back, Style


def run_formatter(file, formatter):
    print("Formatting file: " + Back.BLACK + file + Style.RESET_ALL)
    os.system(formatter + file)
    os.system("git add " + file)


def format_files(staged_files, file_extension, formatter):
    target_files = filter(lambda x: x.endswith(file_extension), staged_files)
    [run_formatter(file, formatter) for file in target_files]


def format_python(files):
    format_files(files, ".py", "autopep8 -i ")


def main():
    print("--- Running pre-commit hook ---")
    file = subprocess.check_output(
        "git diff --name-only --staged",
        shell=True,
        universal_newlines=True)
    committed_files = file.split("\n")
    format_python(committed_files)
    print(Fore.GREEN + Style.BRIGHT +
          "pre-commit hook finished successfully." + Style.RESET_ALL)
    print("-------------------------------")
    sys.exit(0)


if __name__ == "__main__":
    main()
