// To parse this data:
//
//   import { Convert, SpaceCock } from "./file";
//
//   const spaceCock = Convert.toSpaceCock(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface SpaceCock {
    Id?:                   string;
    Name?:                 string;
    Source?:               string;
    ActiveAssetListIndex?: number;
    AssetLists?:           AssetList[];
    UserSatData?:          any[];
    UserSensorData?:       UserSensorDatum[];
    FocusedSat?:           string;
    FocusedSensor?:        null;
    Visuals?:              Visual[];
    SimulationTime?:       Date;
    SimulationSpeed?:      number;
    ScenarioEndTime?:      null;
    Status?:               null;
}

export interface AssetList {
    Name?:            string;
    Sats?:            string[];
    HiddenSatIds?:    any[];
    Sensors?:         string[];
    HiddenSensorIds?: any[];
}

export interface UserSensorDatum {
    Id?:             string;
    Name?:           string;
    Nickname?:       string;
    CountryCode?:    string;
    ThreatCategory?: number;
    IsCustom?:       boolean;
    Lat?:            number;
    Lon?:            number;
    Altitude?:       number;
    MinRange?:       number;
    MaxRange?:       number;
    AzimuthMax?:     number;
    AzimuthMin?:     number;
    ElevationMax?:   number;
    ElevationMin?:   number;
}

export interface Visual {
    ToolType?:               string;
    InvolvedSceneObjectIds?: string[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toSpaceCock(json: string): SpaceCock {
        return cast(JSON.parse(json), r("SpaceCock"));
    }

    public static spaceCockToJson(value: SpaceCock): string {
        return JSON.stringify(uncast(value, r("SpaceCock")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "SpaceCock": o([
        { json: "Id", js: "Id", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "Source", js: "Source", typ: u(undefined, "") },
        { json: "ActiveAssetListIndex", js: "ActiveAssetListIndex", typ: u(undefined, 0) },
        { json: "AssetLists", js: "AssetLists", typ: u(undefined, a(r("AssetList"))) },
        { json: "UserSatData", js: "UserSatData", typ: u(undefined, a("any")) },
        { json: "UserSensorData", js: "UserSensorData", typ: u(undefined, a(r("UserSensorDatum"))) },
        { json: "FocusedSat", js: "FocusedSat", typ: u(undefined, "") },
        { json: "FocusedSensor", js: "FocusedSensor", typ: u(undefined, null) },
        { json: "Visuals", js: "Visuals", typ: u(undefined, a(r("Visual"))) },
        { json: "SimulationTime", js: "SimulationTime", typ: u(undefined, Date) },
        { json: "SimulationSpeed", js: "SimulationSpeed", typ: u(undefined, 0) },
        { json: "ScenarioEndTime", js: "ScenarioEndTime", typ: u(undefined, null) },
        { json: "Status", js: "Status", typ: u(undefined, null) },
    ], false),
    "AssetList": o([
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "Sats", js: "Sats", typ: u(undefined, a("")) },
        { json: "HiddenSatIds", js: "HiddenSatIds", typ: u(undefined, a("any")) },
        { json: "Sensors", js: "Sensors", typ: u(undefined, a("")) },
        { json: "HiddenSensorIds", js: "HiddenSensorIds", typ: u(undefined, a("any")) },
    ], false),
    "UserSensorDatum": o([
        { json: "Id", js: "Id", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "Nickname", js: "Nickname", typ: u(undefined, "") },
        { json: "CountryCode", js: "CountryCode", typ: u(undefined, "") },
        { json: "ThreatCategory", js: "ThreatCategory", typ: u(undefined, 0) },
        { json: "IsCustom", js: "IsCustom", typ: u(undefined, true) },
        { json: "Lat", js: "Lat", typ: u(undefined, 3.14) },
        { json: "Lon", js: "Lon", typ: u(undefined, 3.14) },
        { json: "Altitude", js: "Altitude", typ: u(undefined, 0) },
        { json: "MinRange", js: "MinRange", typ: u(undefined, 0) },
        { json: "MaxRange", js: "MaxRange", typ: u(undefined, 0) },
        { json: "AzimuthMax", js: "AzimuthMax", typ: u(undefined, 0) },
        { json: "AzimuthMin", js: "AzimuthMin", typ: u(undefined, 0) },
        { json: "ElevationMax", js: "ElevationMax", typ: u(undefined, 0) },
        { json: "ElevationMin", js: "ElevationMin", typ: u(undefined, 0) },
    ], false),
    "Visual": o([
        { json: "ToolType", js: "ToolType", typ: u(undefined, "") },
        { json: "InvolvedSceneObjectIds", js: "InvolvedSceneObjectIds", typ: u(undefined, a("")) },
    ], false),
};
