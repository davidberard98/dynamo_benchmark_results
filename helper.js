
const BASE_URL = "https://raw.githubusercontent.com/davidberard98/dynamo_benchmark_results/";
const BRANCHES = {
"anijain": "data",
"williamwen": "data_williamwen",
};
const DEFAULT_BRANCH_SOURCE = "williamwen";
const LOOKUP_FILE = "lookup.csv";
const METRIC = "performance";
const SUPPORTED_DTYPE = ["amp", "float32"];

const DIV_DAY1 = "div_day1";
const DIV_DAY2 = "div_day2";
const DAY1_DEFAULT_SELECTION = "Select control dataset";
const DAY2_DEFAULT_SELECTION = "Select test dataset";
const DAY1_DROPDOWN_ID = "dropdown_day1";
const DAY2_DROPDOWN_ID = "dropdown_day2";

const DIV_SHOWLESS = "div_showless";
const SHOWLESS_CHECK_ID = "check_showless";

const DTYPE_DIV = "div_dtype";
const DTYPE_DEFAULT_SELECTION = "Select dtype";
const DTYPE_DROPDOWN_ID = "dropdown_dtype";

const DIV_DATASOURCE = "div_datasource";
const DROPDOWN_DATASOURCE = "dropdown_datasource";

const TABLES_DIV = "div_tables";

const TEXT_DATA = "text";
const NUMERICAL_DATA = "numerical";
const RATIO_DATA = "ratio";
const GEOMEAN_DATA = "geomean";
const MEMORY_DATA = "memory";
const COMP_TIME_DATA = "comp_time";

const CURRENT_YEAR = 2022;

const MAX_RED_COLOR = "#FF2222";
const MAX_YELLOW_COLOR = "#FFFF22";
const MAX_GREEN_COLOR = "#22FF22";
const MAX_COLORS = [MAX_RED_COLOR, MAX_YELLOW_COLOR, MAX_GREEN_COLOR];

const ACCURACY_CONFIG = {
"columns": 4,
"get_results": row => ({"accuracy": row[3]}),
"get_name": row => row[1],
"data_type": TEXT_DATA,
};
const PERFORMANCE_CONFIG = {
"columns": 7,
"get_results": function(row) {
    return ({
    "speedup": parseFloat(row[3]),
    "abs_latency": parseFloat(row[4]),
    "compilation_latency": parseFloat(row[5]),
    "compression_ratio": parseFloat(row[6]),
    })
},
"get_name": row => row[1],
"data_type": NUMERICAL_DATA,
};
const splitRatio = function(full_data) {
return full_data.split(", ")[1]
};
const PASSRATE_CONFIG = {
"columns": 5,
"get_results": function(row) {
    return ({
    "torchbench": splitRatio(row[2]),
    "huggingface": splitRatio(row[3]),
    "timm_models": splitRatio(row[4]),
    })
},
"get_name": row => row[1],
"data_type": RATIO_DATA,
};
const GEOMEAN_CONFIG = {
"columns": 5,
"get_results": row => ({
    "torchbench": row[2],
    "huggingface": row[3],
    "timm_models": row[4],
}),
"get_name": row => row[1],
"data_type": GEOMEAN_DATA,
};
const MEMORY_CONFIG = {
"columns": 5,
"get_results": row => ({
    "torchbench": row[2],
    "huggingface": row[3],
    "timm_models": row[4],
}),
"get_name": row => row[1],
"data_type": MEMORY_DATA,
};
const COMP_TIME_CONFIG = {
"columns": 5,
"get_results": row => ({
    "torchbench": row[2],
    "huggingface": row[3],
    "timm_models": row[4],
}),
"get_name": row => row[1],
"data_type": COMP_TIME_DATA,
};

BENCHMARK_SUITES = ["torchbench", "huggingface", "timm"];
BACKENDS = ["eager", "inductor", "inductor_no_cudagraphs"];
CONFIGS = {
"accuracy": ACCURACY_CONFIG,
"performance": PERFORMANCE_CONFIG,
"passrate": PASSRATE_CONFIG,
"geomean": GEOMEAN_CONFIG,
"memory.csv": MEMORY_CONFIG,
"comp_time.csv": COMP_TIME_CONFIG
};

const DATA_FILES = [
/*
IGNORED FILES:
aot_cudagraphs_huggingface_amp_training_cuda_accuracy.csv
aot_cudagraphs_huggingface_amp_training_cuda_performance.csv
aot_cudagraphs_huggingface_amp_training_cuda_performance_compilation_metrics.csv
aot_cudagraphs_timm_models_amp_training_cuda_accuracy.csv
aot_cudagraphs_timm_models_amp_training_cuda_performance.csv
aot_cudagraphs_timm_models_amp_training_cuda_performance_compilation_metrics.csv
aot_cudagraphs_torchbench_amp_training_cuda_accuracy.csv
aot_cudagraphs_torchbench_amp_training_cuda_performance.csv
aot_cudagraphs_torchbench_amp_training_cuda_performance_compilation_metrics.csv
aot_eager_huggingface_amp_training_cuda_accuracy.csv
aot_eager_huggingface_amp_training_cuda_performance.csv
aot_eager_huggingface_amp_training_cuda_performance_compilation_metrics.csv
aot_eager_timm_models_amp_training_cuda_accuracy.csv
aot_eager_timm_models_amp_training_cuda_performance.csv
aot_eager_timm_models_amp_training_cuda_performance_compilation_metrics.csv
aot_eager_torchbench_amp_training_cuda_accuracy.csv
aot_eager_torchbench_amp_training_cuda_performance.csv
aot_eager_torchbench_amp_training_cuda_performance_compilation_metrics.csv
nvprims_nvfuser_huggingface_amp_training_cuda_accuracy.csv
nvprims_nvfuser_huggingface_amp_training_cuda_performance.csv
nvprims_nvfuser_huggingface_amp_training_cuda_performance_compilation_metrics.csv
nvprims_nvfuser_timm_models_amp_training_cuda_accuracy.csv
nvprims_nvfuser_timm_models_amp_training_cuda_performance.csv
nvprims_nvfuser_timm_models_amp_training_cuda_performance_compilation_metrics.csv
nvprims_nvfuser_torchbench_amp_training_cuda_accuracy.csv
nvprims_nvfuser_torchbench_amp_training_cuda_performance.csv
nvprims_nvfuser_torchbench_amp_training_cuda_performance_compilation_metrics.csv
*/
  "passrate.csv",
  "geomean.csv",
  "memory.csv",
  "comp_time.csv",
  "eager_huggingface_{}_training_cuda_accuracy.csv",
  "eager_huggingface_{}_training_cuda_performance.csv",
  //"eager_huggingface_{}_training_cuda_performance_compilation_metrics.csv",
  "eager_timm_models_{}_training_cuda_accuracy.csv",
  "eager_timm_models_{}_training_cuda_performance.csv",
  //"eager_timm_models_{}_training_cuda_performance_compilation_metrics.csv",
  "eager_torchbench_{}_training_cuda_accuracy.csv",
  "eager_torchbench_{}_training_cuda_performance.csv",
  //"eager_torchbench_{}_training_cuda_performance_compilation_metrics.csv",
  "inductor_huggingface_{}_training_cuda_accuracy.csv",
  "inductor_huggingface_{}_training_cuda_performance.csv",
  //"inductor_huggingface_{}_training_cuda_performance_compilation_metrics.csv",
  "inductor_no_cudagraphs_huggingface_{}_training_cuda_accuracy.csv",
  "inductor_no_cudagraphs_huggingface_{}_training_cuda_performance.csv",
  //"inductor_no_cudagraphs_huggingface_{}_training_cuda_performance_compilation_metrics.csv",
  "inductor_no_cudagraphs_timm_models_{}_training_cuda_accuracy.csv",
  "inductor_no_cudagraphs_timm_models_{}_training_cuda_performance.csv",
  //"inductor_no_cudagraphs_timm_models_{}_training_cuda_performance_compilation_metrics.csv",
  "inductor_no_cudagraphs_torchbench_{}_training_cuda_accuracy.csv",
  "inductor_no_cudagraphs_torchbench_{}_training_cuda_performance.csv",
  //"inductor_no_cudagraphs_torchbench_{}_training_cuda_performance_compilation_metrics.csv",
  "inductor_timm_models_{}_training_cuda_accuracy.csv",
  "inductor_timm_models_{}_training_cuda_performance.csv",
  //"inductor_timm_models_{}_training_cuda_performance_compilation_metrics.csv",
  "inductor_torchbench_{}_training_cuda_accuracy.csv",
  "inductor_torchbench_{}_training_cuda_performance.csv",
  //"inductor_torchbench_{}_training_cuda_performance_compilation_metrics.csv",
];


function naiveParseCsv(msg, delimiter=",", expected_cols=null) {
  const as_array = msg
    .split("\n")
    .map(function(row) {
      let cur = "";
      let quote_level = 0;
      let ret = [];
      for (const c of row) {
        if (quote_level == 0) {
          if (quote_level == 0 && c == '"') {
            quote_level = 1;
          } else if (quote_level == 0 && c == delimiter) {
            quote_level = 0;
            ret.push(cur);
            cur = "";
          } else {
            cur += c;
          }
        } else if (quote_level == 1) {
          if (c == '"') {
            cur += c;
            quote_level = 2;
          } else {
            cur += c;
          }
        } else if (quote_level == 2) {
          if (c == '"') {
            // just an escaped quote
            quote_level = 1;
          } else if (c == delimiter) {
            quote_level = 0;
            cur = cur.slice(0, cur.length-1);
            ret.push(cur);
            cur = "";
          } else {
            console.error("Bad csv file");
          }
        }
      }
      if (quote_level == 2) {
        cur = cur.slice(0, cur.length-1);
      }
      ret.push(cur);

      return ret;
    }).filter(
      x => x.length > 0 && x[0].length > 0
    );
  return as_array;
}

function parseLookupCsv(msg) {
  data = naiveParseCsv(msg, ",", 4);
  data = data.map(row => ({
    "day": row[0],
    "metric": row[1],
    "dtype": row[2],
    "path": row[3],
  })).filter(
    row => row["metric"] == METRIC && SUPPORTED_DTYPE.includes(row["dtype"])
  );
  return data;
}


function generateColorGradient(
  ratio,
  ratio_threshold=0.1,
  positive_is_good=true,
) {
  const clamp = function(x, min_val, max_val) {
    if (x < min_val) {
      return min_val;
    }
    if (x > max_val) {
      return max_val;
    }
    return x;
  };

  const MAX_BRIGHTNESS = 255;
  const display_ratio = clamp(
    ratio,
    1-ratio_threshold,
    1+ratio_threshold
  );

  const diff = positive_is_good ? display_ratio-1 : 1-display_ratio;
  const abs_diff = diff > 0 ? diff : -diff;

  const otherColor = Math.floor(MAX_BRIGHTNESS - 200 * (abs_diff / ratio_threshold)).toString();
  let full_color = `rgb(${MAX_BRIGHTNESS}, ${MAX_BRIGHTNESS}, ${MAX_BRIGHTNESS})`;
  if (diff > 0) {
    full_color = `rgb(${otherColor}, ${MAX_BRIGHTNESS}, ${otherColor})`;
  } else {
    full_color = `rgb(${MAX_BRIGHTNESS}, ${otherColor}, ${otherColor})`;
  }

  return full_color;
}

function colorResults(
  data_type,
  old_value,
  new_value,
) {
  if (data_type == TEXT_DATA) {
    const mapping = function(x) {
      const result_order = {
        "pass": 0,
        "fail_accuracy": 1,
        "eager_variation": 1,
        "fail_to_run": 2,
      };
      if (result_order[x] === undefined) {
        return 2;
      }
      return result_order[x];
    }

    const old_order = mapping(old_value);
    const new_order = mapping(new_value);

    const diff = new_order - old_order;
    switch (diff) {
      case -2: case -1:
        return MAX_GREEN_COLOR;
      case 0:
        return "#FFFFFF";
      case 1:
        return MAX_YELLOW_COLOR;
      case 2:
        return MAX_RED_COLOR;
    }
  } else if (data_type == RATIO_DATA) {
    const parseRatio = function(str_val) {
      if (str_val.includes(",")) {
        str_val = str_val.split(",")[1];
      }
      [num, den] = str_val.split("/").map(x => parseFloat(x));
      return num/den;
    };

    const [old_ratio, new_ratio] = [old_value, new_value].map(x => parseRatio(x));


    return generateColorGradient(
      new_ratio / old_ratio,
      0.1,
      true,
    );
  } else if (data_type == GEOMEAN_DATA || data_type == MEMORY_DATA) {
    const parseSpeedup = function(str_val) {
      return parseFloat(str_val.split("x")[0]);
    };

    const [old_speedup, new_speedup] = [old_value, new_value].map(x => parseSpeedup(x));

    return generateColorGradient(
      new_speedup / old_speedup,
      0.1,
      true,
    );
  } else {
    const new_number = parseFloat(new_value);
    const old_number = parseFloat(old_value);
    const isBadNumber = function(num) {
      return isNaN(num) || num == 0;
    };
    if (isBadNumber(new_number) && !isBadNumber(old_number)) {
      return MAX_RED_COLOR;
    }
    if (!isBadNumber(new_number) && isBadNumber(old_number)) {
      return MAX_GREEN_COLOR;
    }

    return generateColorGradient(
      old_number / new_number,
      0.1,
      true,
    );
  }
}
