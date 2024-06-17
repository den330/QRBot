const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Responds with QRCode")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Content to be converted to QRCode")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("size").setDescription("Size of QRCode").setRequired(false)
    ),
  async execute(interaction) {
    const encodedContent = encodeURIComponent(
      interaction.options.getString("content")
    );
    const size = interaction.options.getInteger("size") || 300;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedContent}`;
    const qrcodeImage = new AttachmentBuilder(url, { name: "qrcode.png" });
    await interaction.reply({
      files: [qrcodeImage],
      content: "Here is your QRCode",
    });
  },
};
