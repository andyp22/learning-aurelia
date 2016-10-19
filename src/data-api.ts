let latency = 200;
let id = 0;

function getId() {
  return ++id;
}

let nodes = [
  {
    id: getId(),
    type: 'MultChoice',
    args: {
      prompt: 'Please select a choice:',
      correctChoice: 0,
      choices: [
        {
          id: 0,
          text: 'The first choice (correct)',
        },
        {
          id: 1,
          text: 'The second choice',
        },
        {
          id: 2,
          text: 'The third choice',
        },
      ],
    }
  },
];

export class DataAPI {
  isRequesting = false;

  getNodeList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = nodes.map(x => {
          return {
            id: x.id,
            type: x.type,
            args: x.args,
          }
        });
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getNodeDetails(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = nodes.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveNode(node) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(node));
        let found = nodes.filter(x => x.id == node.id)[0];

        if (found) {
          let index = nodes.indexOf(found);
          nodes[index] = instance;
        } else {
          instance.id = getId();
          nodes.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
