export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "College Station Chinese Bible Church",
  description: "Make beautiful websites regardless of your design experience.",
  ministries: [
    {
      id: "family",
      title_en: "Family Fellowship",
      title_zh: "家庭团契",
      title_zhHant: "家庭團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/family_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/family_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/family_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/families_fellowship.jpg`
    },
    {
      id: "youth",
      title_en: "Children & Youth Fellowship",
      title_zh: "青少年团契",
      title_zhHant: "青少年團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/childrenYouth_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/childrenYouth_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/childrenYouth_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/children_group_fellowship.jpg`
    },
    {
      id: "loveGroup",
      title_en: "Love Group Fellowship",
      title_zh: "仁爱组团契",
      title_zhHant: "仁愛組團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/loveGroup_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/loveGroup_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/loveGroup_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/default_fellowship.jpg`
    },
    {
      id: "faithGroup",
      title_en: "Faith Group Fellowship",
      title_zh: "信实组团契",
      title_zhHant: "信實組團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/faithGroup_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/faithGroup_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/faithGroup_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/default_fellowship.jpg`
    },
    {
      id: "joyGroup",
      title_en: "Joy Group Fellowship",
      title_zh: "喜乐组团契",
      title_zhHant: "喜樂組團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/joyGroup_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/joyGroup_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/joyGroup_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/default_fellowship.jpg`
    },
    {
      id: "scholar",
      title_en: "Scholar Fellowship",
      title_zh: "学者团契",
      title_zhHant: "學者團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/scholar_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/scholar_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/scholar_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/scholar_fellowship.jpg`
    },
    {
      id: "student",
      title_en: "Student Fellowship",
      title_zh: "学生团契",
      title_zhHant: "學生團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/student_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/student_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/student_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/students_fellowship.jpg`
    },
    {
      id: "brothers",
      title_en: "Brothers Fellowship",
      title_zh: "弟兄团契",
      title_zhHant: "弟兄團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/brotherhood_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/brotherhood_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/brotherhood_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/brothers_fellowship.jpg`
    },
    {
      id: "sisters",
      title_en: "Sisters Fellowship",
      title_zh: "姐妹团契",
      title_zhHant: "姐妹團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/sisterhood_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/sisterhood_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/sisterhood_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/sisters_fellowship.jpg`
    },
    {
      id: "youngProfessionals",
      title_en: "Young Professionals Fellowship",
      title_zh: "职青团契",
      title_zhHant: "職青團契",
      detail_md_url_en: `${process.env.R2_ENDPOINT}/markdown/youngProfessional_ministry_en.md`,
      detail_md_url_zh: `${process.env.R2_ENDPOINT}/markdown/youngProfessional_ministry_zh.md`,
      detail_md_url_zhHant: `${process.env.R2_ENDPOINT}/markdown/youngProfessional_ministry_zh-Hant.md`,
      img_url: `${process.env.R2_ENDPOINT}/youngProfessionals_fellowship.jpg`
    }
  ]
};
