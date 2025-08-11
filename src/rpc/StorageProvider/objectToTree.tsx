export default class ObjectToTree {
  decompose(data: any, refs: any[] = [], idMaker: { counter: number } = { counter: 0 }): any {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (refs.includes(data[i])) {
          if (data[i]['__idx'] == null) {
            data[i]['__idx'] = ++idMaker.counter;
          }
          data[i] = { "__ridx": data[i]['__idx'] };
        }
        this.decompose(data[i], refs, idMaker);
      }
    } else if (data != null && typeof data === "object") {
      if (!refs.includes(data)) {
        refs.push(data);
      }
      for (let k in data) {
        if (data[k] != null && refs.includes(data[k])) {
          if (data[k]['__idx'] == null) {
            data[k]['__idx'] = ++idMaker.counter;
          }
          data[k] = { "__ridx": data[k]['__idx'] };
        } else {
          this.decompose(data[k], refs, idMaker);
        }
      }
    }
    return data;
  }

  compose(data: any): any {
    const refs = this.collectRefs(data);
    this.replaceRefs(data, refs);
    return data;
  }

  collectRefs(data: any, refs: any[] = []): any[] {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        this.collectRefs(data[i], refs);
      }
    } else if (data != null && typeof data === "object") {
      if (data.hasOwnProperty("__idx")) {
        refs[data['__idx']] = data;
        delete data['__idx'];
      }
      for (let k in data) {
        this.collectRefs(data[k], refs);
      }
    }
    return refs;
  }

  replaceRefs(data: any, irefs: any[]): any {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty("__ridx")) {
          data[i] = irefs[data[i]["__ridx"]];
        } else {
          this.replaceRefs(data[i], irefs);
        }
      }
    } else if (data != null && typeof data === "object") {
      for (let k in data) {
        if (data[k] != null && data[k].hasOwnProperty("__ridx")) {
          data[k] = irefs[data[k]["__ridx"]];
        } else {
          this.replaceRefs(data[k], irefs);
        }
      }
    }
    return data;
  }
}
