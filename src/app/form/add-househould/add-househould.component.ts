import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
   
@Component({
  selector: 'app-add-househould',
  templateUrl: './add-househould.component.html',
  styleUrls: ['./add-househould.component.scss']
})
export class AddHousehouldComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  id='';
  index=0;
  data = null;

  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  } 
  public exportHTML(){
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
         "xmlns='http://www.w3.org/TR/REC-html40'>"+
         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header+document.getElementById("source-html").innerHTML+footer;
    
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
 }

 constructor(

  private service: BussinessHouseholdService,
  private route: ActivatedRoute
) { }


ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap)=>{
    this.id = params.get('id');
  });
  if(this.index >= 0){
    this.service.getBussinessHouseById(this.id).subscribe((d)=>{
      this.data = d;
      console.log(this.data);
    });
  }
};

}
