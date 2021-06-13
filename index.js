const { Plugin } = require('powercord/entities');
const { get } = require('powercord/http');

module.exports = class PCUserCheck extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: 'check',
      usage: '{c} <id>',
      description: 'Check a user PowerCord.',
      executor: (ID) => {
        return this.check(ID)
      }
    })
  }
  async check(ID) {
    try {
      //{"developer":null,"staff":null,"support":null,"contributor":null,"translator":null,"hunter":null,"early":null}
      const Data = await get(`https://powercord.dev/api/v2/users/${ID}`)
      const Embed = {
        type: 'rich',
        title: '**' + Data.body.username + '#' + Data.body.discriminator + '**',
        description: '**This list may be out of date.**',
        fields: [
          {
            name: '**Username**',
            value: Data.body.username + '#' + Data.body.discriminator,
            inline: true
          },
          {
            name: '**ID**',
            value: Data.body.id,
            inline: true
          },
          {
            name: '**Badges:**',
            value: `**Developer:** ${Data.body.badges.developer}\n**Staff:** ${Data.body.badges.staff}\n**Support:** ${Data.body.badges.support}\n**Contributor:** ${Data.body.badges.contributor}\n**Translator:** ${Data.body.badges.translator}\n**Hunter:** ${Data.body.badges.hunter}\n**Early:** ${Data.body.badges.early}\n`,
            inline: false
          }],
      }
      return {
        result: Embed,
        embed: true
      }
    } catch (err) {
      console.error('Error executing "pc-user-checker":\n' + err)
      return {
        result: '**Failed connect or invalid user in API Data.**',
      }
    }
  };
}