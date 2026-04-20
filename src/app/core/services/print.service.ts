import { Injectable } from '@angular/core';
import { CV, Experience, EnterpriseProject, Project } from '../../models/cv.model';

/**
 * Print Service — Generates LaTeX-style ATS-friendly CV in a separate window.
 * The print window is intentionally NOT affected by dark mode.
 */
@Injectable({
  providedIn: 'root'
})
export class PrintService {
  /**
   * Create a standalone HTML element helper
   */
  private h(tag: string, attrs: Record<string, string> = {}, ...children: (HTMLElement | string)[]): HTMLElement {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    children.forEach(c => {
      if (c == null) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }

  /**
   * Generate print CV in a new window
   */
  generatePrintCV(cv: CV): void {
    const printDoc = this.buildPrintDocument(cv);
    const win = window.open('', '_blank', 'width=900,height=700');
    
    if (!win) {
      alert('Please allow pop-ups for this site to open the print preview.');
      return;
    }

    win.document.open();
    win.document.write('<!DOCTYPE html>' + printDoc.documentElement.outerHTML);
    win.document.close();

    win.addEventListener('load', () => {
      setTimeout(() => {
        win.focus();
        win.print();
      }, 400);
    });
  }

  /**
   * Build print document with semantic HTML and print styles
   */
  private buildPrintDocument(cv: CV): Document {
    const doc = document.implementation.createHTMLDocument('CV');

    // Head: Meta tags, fonts, print stylesheet
    doc.head.appendChild(this.h('meta', { charset: 'UTF-8' }));
    doc.head.appendChild(this.h('meta', { name: 'viewport', content: 'width=device-width' }));
    doc.head.appendChild(this.h('title', {}, `${cv.name} — CV`));
    doc.head.appendChild(
      this.h('link', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap'
      })
    );

    // Inline print stylesheet
    const styleEl = document.createElement('style');
    styleEl.textContent = this.getPrintStyles();
    doc.head.appendChild(styleEl);

    // Body: Build CV structure
    const body = doc.body;

    // Header
    const header = this.h('div', { class: 'p-header' });
    header.appendChild(this.h('div', { class: 'p-name' }, cv.name));
    header.appendChild(this.h('div', { class: 'p-title' }, cv.title));
    
    const contactLine = this.h('div', { class: 'p-contact' });
    cv.contact.forEach(c => {
      const sp = this.h('span');
      sp.appendChild(this.h('a', { href: c.href }, c.label));
      contactLine.appendChild(sp);
    });
    header.appendChild(contactLine);
    body.appendChild(header);

    // Summary
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Summary'));
    body.appendChild(this.h('p', { class: 'p-summary' }, cv.summary));

    // Technical Skills
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Technical Skills'));
    const tbl = this.h('table', { class: 'p-skills-table' });
    cv.skills.forEach(s => {
      const tr = this.h('tr');
      tr.appendChild(this.h('td', {}, s.label));
      tr.appendChild(this.h('td', {}, s.value));
      tbl.appendChild(tr);
    });
    body.appendChild(tbl);

    // Professional Experience
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Professional Experience'));
    cv.experience.forEach(exp => {
      this.renderPrintEntry(body, {
        title: exp.title,
        date: exp.dates,
        sub: `${exp.org} · ${exp.location}`,
        stack: exp.stack,
        bullets: exp.bullets
      });
    });

    // Enterprise Projects
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Selected Enterprise Projects'));
    const note = this.h(
      'p',
      { class: 'p-section-note' },
      'The following systems were designed, developed, and delivered as part of professional employment at PlayOn 24. Source code is proprietary and under client NDA.'
    );
    body.appendChild(note);

    cv.enterpriseProjects.forEach(proj => {
      this.renderPrintEntry(body, {
        title: proj.title,
        sub: proj.context,
        bullets: proj.bullets
      });
    });

    // Open Source Projects
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Open Source & Personal Projects'));
    cv.projects.forEach(proj => {
      this.renderPrintEntry(body, {
        title: proj.title,
        links: proj.links,
        bullets: proj.bullets
      });
    });

    // Education
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Education'));
    cv.education.forEach(edu => {
      const entry = this.h('div', { class: 'p-edu' });
      const row = this.h('div', { class: 'p-entry-row' });
      row.appendChild(this.h('div', { class: 'p-entry-title' }, edu.degree));
      row.appendChild(this.h('div', { class: 'p-entry-date' }, edu.dates));
      entry.appendChild(row);
      entry.appendChild(
        this.h('div', { class: 'p-entry-org' }, edu.school + (edu.detail ? ` · ${edu.detail}` : ''))
      );
      body.appendChild(entry);
    });

    // Certifications
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Certifications'));
    cv.certifications.forEach(cert => {
      const row = this.h('div', { class: 'p-cert' });
      const left = this.h('div');
      const nameEl = cert.href
        ? this.h('a', { href: cert.href, class: 'p-cert-name' }, cert.name)
        : this.h('span', { class: 'p-cert-name' }, cert.name);
      left.appendChild(nameEl);
      left.appendChild(this.h('span', { class: 'p-cert-issuer' }, ` — ${cert.issuer}`));
      row.appendChild(left);
      row.appendChild(this.h('span', { class: 'p-cert-date' }, cert.dates));
      body.appendChild(row);
    });

    // Additional
    body.appendChild(this.h('div', { class: 'p-section-title' }, 'Additional'));
    const twoCol = this.h('div', { class: 'p-two-col' });

    const langDiv = this.h('div');
    langDiv.appendChild(this.h('div', { class: 'p-mini-label' }, 'Languages'));
    const langVal = this.h('div', { class: 'p-mini-value' });
    langVal.innerHTML = cv.additional.languages.replace(/\n/g, '<br>');
    langDiv.appendChild(langVal);
    twoCol.appendChild(langDiv);

    const intDiv = this.h('div');
    intDiv.appendChild(this.h('div', { class: 'p-mini-label' }, 'Interests & Achievements'));
    const intVal = this.h('div', { class: 'p-mini-value' });
    intVal.innerHTML = `${cv.additional.interests}<br><strong>${cv.additional.achievement}</strong>`;
    intDiv.appendChild(intVal);
    twoCol.appendChild(intDiv);

    body.appendChild(twoCol);

    return doc;
  }

  /**
   * Render a single entry block in print doc
   */
  private renderPrintEntry(
    body: HTMLElement,
    opts: {
      title: string;
      date?: string;
      sub?: string;
      stack?: string;
      links?: any[];
      bullets?: string[];
    }
  ): void {
    const entry = this.h('div', { class: 'p-entry' });

    const row = this.h('div', { class: 'p-entry-row' });
    row.appendChild(this.h('div', { class: 'p-entry-title' }, opts.title));
    if (opts.date) row.appendChild(this.h('div', { class: 'p-entry-date' }, opts.date));
    entry.appendChild(row);

    if (opts.sub) {
      entry.appendChild(this.h('div', { class: 'p-entry-org' }, opts.sub));
    }

    if (opts.stack) {
      entry.appendChild(this.h('div', { class: 'p-entry-stack' }, `Tech: ${opts.stack}`));
    }

    if (opts.links?.length) {
      const linkLine = this.h('div', { class: 'p-proj-link' });
      opts.links.forEach((l, i) => {
        if (i > 0) linkLine.appendChild(document.createTextNode(' · '));
        linkLine.appendChild(this.h('a', { href: l.href }, `${l.label}: ${l.href}`));
      });
      entry.appendChild(linkLine);
    }

    if (opts.bullets?.length) {
      const ul = this.h('ul');
      opts.bullets.forEach(b => ul.appendChild(this.h('li', {}, b)));
      entry.appendChild(ul);
    }

    body.appendChild(entry);
  }

  /**
   * Inline print stylesheet (LaTeX-style, professional, ATS-friendly)
   */
  private getPrintStyles(): string {
    return `
      /* Print CV Stylesheet */
      @page {
        size: A4;
        margin: 18mm 20mm 18mm 20mm;
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }

      html, body {
        width: 210mm;
        font-family: "EB Garamond", Georgia, "Times New Roman", serif;
        font-size: 12pt;
        line-height: 1.45;
        color: #000;
        background: #fff;
      }

      a { color: #000; text-decoration: none; }

      /* Header */
      .p-header {
        text-align: center;
        border-bottom: 1.5pt solid #000;
        padding-bottom: 6pt;
        margin-bottom: 8pt;
      }

      .p-name {
        font-size: 22pt;
        font-weight: bold;
        letter-spacing: .04em;
        text-transform: uppercase;
        line-height: 1.1;
      }

      .p-title {
        font-size: 12pt;
        color: #333;
        margin-top: 2pt;
        font-style: italic;
      }

      .p-contact {
        font-size: 11pt;
        margin-top: 5pt;
        color: #222;
        font-family: Arial, Helvetica, sans-serif;
      }

      .p-contact span { margin: 0 6pt; }
      .p-contact span:first-child { margin-left: 0; }

      /* Section Title */
      .p-section-title {
        font-size: 12pt;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: .08em;
        font-family: Arial, Helvetica, sans-serif;
        border-bottom: .75pt solid #000;
        margin-top: 11pt;
        margin-bottom: 5pt;
        padding-bottom: 1.5pt;
      }

      /* Summary */
      .p-summary {
        font-size: 12pt;
        color: #111;
        line-height: 1.5;
        text-align: justify;
      }

      /* Entry */
      .p-entry { margin-bottom: 7pt; page-break-inside: avoid; }

      .p-entry-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 4pt;
      }

      .p-entry-title {
        font-size: 12pt;
        font-weight: bold;
      }

      .p-entry-date {
        font-size: 11pt;
        font-family: Arial, Helvetica, sans-serif;
        color: #333;
        white-space: nowrap;
      }

      .p-entry-org {
        font-size: 12pt;
        font-style: italic;
        color: #222;
        margin-top: 1pt;
      }

      .p-entry-stack {
        font-size: 11pt;
        color: #444;
        font-family: Arial, Helvetica, sans-serif;
        margin-top: 1.5pt;
        margin-bottom: 2pt;
      }

      .p-entry ul {
        padding-left: 12pt;
        margin-top: 2pt;
      }

      .p-entry li {
        font-size: 12pt;
        margin-bottom: 2pt;
        line-height: 1.45;
        list-style-type: disc;
      }

      /* Skills Table */
      .p-skills-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 2pt;
      }

      .p-skills-table td {
        font-size: 12pt;
        vertical-align: top;
        padding: 1.5pt 4pt 1.5pt 0;
        line-height: 1.45;
      }

      .p-skills-table td:first-child {
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        width: 28%;
        color: #111;
        white-space: nowrap;
      }

      /* Education */
      .p-edu { margin-bottom: 5pt; page-break-inside: avoid; }

      /* Certifications */
      .p-cert {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 12pt;
        margin-bottom: 3pt;
        gap: 8pt;
      }

      .p-cert-name { font-weight: bold; }
      .p-cert-issuer { color: #444; font-style: italic; font-size: 11pt; }
      .p-cert-date {
        font-family: Arial, Helvetica, sans-serif;
        color: #333;
        font-size: 11pt;
        white-space: nowrap;
      }

      /* Section Note */
      .p-section-note {
        font-size: 11pt;
        font-style: italic;
        color: #555;
        margin-bottom: 5pt;
        font-family: Arial, Helvetica, sans-serif;
      }

      /* Project Links */
      .p-proj-link {
        font-size: 11pt;
        font-family: Arial, Helvetica, sans-serif;
        color: #333;
        margin-top: 1pt;
      }

      /* Two Column */
      .p-two-col {
        display: flex;
        gap: 20pt;
      }

      .p-two-col > div { flex: 1; }

      .p-mini-label {
        font-size: 11pt;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        text-transform: uppercase;
        letter-spacing: .05em;
        margin-bottom: 2pt;
      }

      .p-mini-value { font-size: 12pt; line-height: 1.5; }
    `;
  }
}
