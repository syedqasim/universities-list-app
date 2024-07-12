// University.ts
class University {
  name: string;
  country: string;
  web_pages: string[];
  domains: string[];

  constructor(
    name: string,
    country: string,
    web_pages: string[],
    domains: string[]
  ) {
    this.name = name;
    this.country = country;
    this.web_pages = web_pages;
    this.domains = domains;
  }
}

export default University;
