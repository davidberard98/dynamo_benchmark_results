import csv
import os
import pathlib
import shutil
import subprocess

from random import random

# LOG_SOURCE = "anijain"
LOG_SOURCE = "williamwen"

if LOG_SOURCE == "anijain":
    SOURCE_PATH = pathlib.Path("/data/home/anijain/cluster/cron_logs/")
    GIT_BRANCH = "data"
elif LOG_SOURCE == "williamwen":
    SOURCE_PATH = pathlib.Path("/data/home/williamwen/cluster/cron_logs/")
    GIT_BRANCH = "data_williamwen"
DEST_PATH = pathlib.Path(__file__).parent.resolve()

LOOKUP_CSV = "lookup.csv"

GIT_BIN = "/usr/bin/git"

def main():
    paths = []
    with open(SOURCE_PATH / LOOKUP_CSV) as f:
        reader = csv.reader(f)
        for row in reader:
            paths.append(row[3])

    def get_csv_files(directory_path : pathlib.Path):
        if not directory_path.is_dir():
            return []
        csv_paths = []
        for fname in os.listdir(directory_path):
            last_dot = fname.rfind('.')
            if last_dot == -1:
                continue
            if fname[last_dot+1:].lower() == "csv":
                csv_paths.append(directory_path / fname)
        return csv_paths

    new_paths = [
        path for path in paths if len(get_csv_files(SOURCE_PATH / path)) > 0 and not (DEST_PATH / path).is_dir()
    ]

    if random() > 0.99:
        for r in [path for path in paths if len(get_csv_files(SOURCE_PATH / path)) > 0][-5:]:
            if r not in new_paths:
                new_paths.append(r)

    if len(new_paths) == 0:
        return

    files_to_git_add = []
    def copy_file_and_record(src, dst):
        shutil.copyfile(src, dst)
        files_to_git_add.append(dst)

    for p in new_paths:
        csv_files = get_csv_files(SOURCE_PATH / p)
        pathlib.Path(DEST_PATH / p).mkdir(exist_ok=True)
        # os.mkdir(DEST_PATH / p)
        for f in csv_files:
            copy_file_and_record(f, DEST_PATH / p / f.name)

    copy_file_and_record(SOURCE_PATH / LOOKUP_CSV, DEST_PATH / LOOKUP_CSV)

    subprocess.run([GIT_BIN, "checkout", GIT_BRANCH])
    subprocess.run([GIT_BIN, "pull"])
    subprocess.run([
        GIT_BIN,
        "add",
        *files_to_git_add
    ])

    msg = "Add:\n"
    for x in files_to_git_add:
        msg.append(str(x) + ",\n")
    subprocess.run([
        GIT_BIN,
        "commit",
        "-m",
        msg,
    ])
    subprocess.run([
        GIT_BIN,
        "push"
    ])

if __name__ == "__main__":
    main()