import update from 'react-addons-update';
import OrganizationStateBuilder from '../utils/orgStateBuilderUtil';

const namespace = 'organizations';

function organizations(state = {} , action) {
  const builder = new OrganizationStateBuilder();

  switch(action.type){
  case namespace +'.SET.ORGS':
    const orgObj ={};

    action.organizations.forEach( org => {
      orgObj[org.name] = { assemblies: {} };
    });

    builder.setItems({$set: orgObj });
    state = update(state, builder.state );
    break;

  case namespace +'.SET.SELECTED':
    state = update(state, {selected: {$set: action.selectedOrganization }} );
    break;

  case namespace +'.SET.ASSEMBLIES':
    var assemblyHash = {};
    action.assemblies.forEach( assembly => { assemblyHash[assembly.ciName] = assembly; });

    builder.setOrganization(action.organization , {$set: {assemblies: assemblyHash}});
    state = update(state, builder.state);
    break;

  case namespace + '.SET.ENVS':
    var environmentHash = {};
    action.environments.forEach(environment => { environmentHash[environment.ciName] = environment; });

    builder.setAssembly(action.organization, action.assembly.ciName, { environments: {$set: environmentHash}});
    state = update(state, builder.state);
    break;

  case namespace + '.SET.PLATFORMS':
    var platforms = {};
    action.platforms.forEach(platform => { platforms[platform.ciName] = platform; });

    builder.setEnvironment(action.organization , action.assembly.ciName, action.environment.ciName, {platforms: {$set: platforms}});
    state = update(state, builder.state);
    break;

    case namespace + '.SET.PLATFORMS.IPS':
      builder.setPlatform(action.organization ,
        action.assembly.ciName, action.environment.ciName, action.platform.ciName, {ips: {$set: action.ips}} );
      state = update(state, builder.state);
    break;
  }

  return state;
}

export default organizations;