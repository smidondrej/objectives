export class BaseStation {
    id!: number;
    slice_id!: number;
}

export class Slice {
    base_station!: Array<BaseStation>;
}

export class Timestep {
    timestep!: number;
    cost_mean_ddc_old!: number;
    cost_mean_slice_old!: number;
    cost_mean_ddc_new!: number;
    cost_mean_slice_new!: number;
}

export class Timesteps {
    time_series!: Array<Timestep>;
}

export class Provision {
    series!: Array<BSProv>;
}

export class BSProv {
    id!: number;
    timestep!: number;
    demand!: number;
    alloc_ddc!: number;
    alloc_slice!: number;
    diff_ddc!: number;
    diff_slice!: number;
    bs!: number;
    cost_ddc!: number;
    slice_cost_ddc!: number;
    cost_slice!: number;
    slice_cost_slice!: number;
}
