import os
import json


def read_country_data(c_file):
    with open(c_file, "r") as f:
        d = f.readlines()
    labels, ds1, ds2 = d
    return labels, ds1, ds2


def run(f_view, f_view_out, data_dir="data"):
    with open(f_view, "r") as f:
        c_view = json.load(f)

    for country in c_view["countries"]:
        cname = country["name"].lower().replace(" ", "-")
        country["charts"] = {}        
        for fn in ("data", "rate", "test"):
            labels, ds1, ds2 = read_country_data(os.path.join(data_dir, f"{fn}-{cname}.csv"))
            
            country["charts"][fn] = {}
            country["charts"][fn]["labels"] = "[\"" + labels[1:-1].replace(",", "\",\"") + "\"]"
            country["charts"][fn]["values"] = "".join([ds1, ds2])


    with open(f_view_out, "w") as f:
        json.dump(c_view, f)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Merge CSV data into Moustache view")

    parser.add_argument("--view-file", type=str, required=False,
                        default="countryView.config.json",
                        help="Path to the countryView.config.json")

    parser.add_argument("--dest-file", type=str, required=False,
                        default="countryView.json",
                        help="Path to the destination countryView.json")

    parser.add_argument("--data-dir", type=str, required=False,
                        default="data",
                        help="Path to the data dir with csv files")


    args = parser.parse_args()

    run(args.view_file, args.dest_file, args.data_dir)
