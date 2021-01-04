let addMaskToInput = function addMaskToInput(inputElement, mask) {
  inputElement = document.querySelector(''.concat(inputElement));
  if (inputElement) {
    vanillaTextMask.maskInput({ inputElement: inputElement, mask: mask });
  }
};
let phoneMask = [
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
let currencyMask = textMaskAddons.createNumberMask({
  prefix: '$',
  includeThousandsSeparator: !0,
});
window.onload = (event) => {
  addMaskToInput('#coBorrowerPhoneNumber', phoneMask);
  addMaskToInput('#phoneNumber', phoneMask);
  addMaskToInput('#businessPhone', phoneMask);
  addMaskToInput('#coBorrowerBusinessPhone', phoneMask);
  addMaskToInput('#coBorrowerBusinessPhone', prevBusinessPhone);

  var forms = document.querySelectorAll('form');
  forms.forEach(function (form) {
    ValidForm(form, { errorPlacement: 'before' });
  });
  // variables
  var isFormValid = false;

  // elements
  var applicationForm = document.getElementById('application-form');
  var firstNameField = document.getElementById('firstName');
  var lastNameField = document.getElementById('lastName');
  var phoneNumberField = document.getElementById('phoneNumber');
  var emailAddressField = document.getElementById('emailAddress');

  var submitButton = document.getElementById('submitButton');
  var successBlock = document.getElementById('successBlock');
  var errorBlock = document.getElementById('errorBlock');
  // START
  runFormCode();

  function generateFormResults(step, resultContainer) {
    $(
      `form .${step} :input:not(:input[type='radio']):not(:input[type='submit'])`
    ).each(function () {
      var input = $(this);
      if (input.parent().find('label').html()) {
        $(`#${resultContainer}`).append(
          `<div class="info-row top-info-row text-left"><div class="info-link-text auto-width-info-link-text">${input
            .parent()
            .find('label')
            .text()
            .split(' *')
            .join('')}: <span id="${input.attr(
            'id'
          )}Text"><strong></strong></span></div></div>`
        );
      } else if (input.parent().find('.dropdown-label').html()) {
        $(`#${resultContainer}`).append(
          `<div class="info-row top-info-row text-left"><div class="info-link-text auto-width-info-link-text">${input
            .parent()
            .find('.dropdown-label')
            .html()}: <span id="${input.attr(
            'id'
          )}Text"><strong></strong></span></div></div>`
        );
      }
    });
  }

  function runFormCode() {
    jQuery
      .getScript('https://code.jquery.com/ui/1.12.1/jquery-ui.js')
      .done(function () {
        $('.form-date').datepicker({ maxDate: new Date() });
        $('#endDate').datepicker('setDate', new Date());
      });

    generateFormResults('step-2', 'borrowerInfo');
    generateFormResults('step-3', 'coBorrowerInfo');

    generateFormResults('currentemployerinfo', 'employmentInfo');
    generateFormResults('prevemployercontainer', 'prevEmploymentInfo');
    generateFormResults('step-5', 'coBorrowerEmploymentInfo');
    // disable form submission if user presses enter
    $(applicationForm).on('keyup keypress', function (e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    var originalSubmitButtonColor = submitButton.style.backgroundColor;
    var submitButtonDisabledColor = 'grey';

    setInterval(function () {
      // Keep submit button in sync with input values
      updateSubmitButtonState();
    }, 250);

    function updateSubmitButtonState() {
      isFormValid =
        firstNameField.validity.valid &&
        lastNameField.validity.valid &&
        emailAddressField.validity.valid;

      submitButton.style.backgroundColor = isFormValid
        ? originalSubmitButtonColor
        : submitButtonDisabledColor;
    }

    function createFormData() {
      var formData = {
        applicationTakenMethodType: 'Internet',
        property: {
          loanPurposeType: $('input[name="loanPurpose"]:checked').val(),
        },
        applications: [
          {
            LoanAmount: $('#loanAmount').val(),
            borrower: {
              emailAddressText: emailAddressField.value,
              firstName: firstNameField.value,
              lastName: lastNameField.value,
              homePhoneNumber: phoneNumberField.value,
            },
            coBorrower: {},
            employment: [
              {
                owner: 'Borrower',
                employerName: $('#currentEmployer').val(),
                currentEmploymentIndicator: true,
                phoneNumber: $('#businessPhone').val(),
                email: $('#businessEmail').val(),
                addressStreetLine1: $('#businessAddress').val(),
                addressCity: $('#businessCity').val(),
                addressState: $('#businessState').val(),
                addressPostalCode: $('#businessZip').val(),
                title: $('#positionTitle').val(),
                startDate: $('#startDate').val(),
                SelfEmployedIndicator:
                  $('#selfEmployed').val() == 'Yes' ? true : false,
              },
            ],
          },
        ],
      };
      if (
        document.querySelector('input[name="coBorrower"]:checked') &&
        document.querySelector('input[name="coBorrower"]:checked').value ==
          'Yes'
      ) {
        formData.applications[0].coBorrower = {
          emailAddressText: $('#coborrowerEmail').val(),
          firstName: $('#coBorrowerFirst').val(),
          homePhoneNumber: $('#coBorrowerPhoneNumber').val(),
          lastName: $('#coBorrowerLast').val(),
        };
        formData.applications[0].employment.push({
          owner: 'CoBorrower',
          employerName: $('#coBorrowerCurrentEmployer').val(),
          currentEmploymentIndicator: true,
          phoneNumber: $('#coBorrowerBusinessPhone').val(),
          email: $('#coBorrowerBusinessEmail').val(),
          addressStreetLine1: $('#coBorrowerBusinessAddress').val(),
          addressCity: $('#coBorrowerBusinessCity').val(),
          addressState: $('#coBorrowerBusinessState').val(),
          addressPostalCode: $('#coborrowerBusinessZip').val(),
          title: $('#coBorrowerPositionTitle').val(),
          startDate: $('#coBorrowerStartDate').val(),
          endDate: $('#coBorrowerEndDate').val(),
          SelfEmployedIndicator:
            $('#coBorrowerSelfEmployed').val() == 'Yes' ? true : false,
        });
      }
      if (
        document.querySelector('input[name="anotherEmployer"]:checked') &&
        document.querySelector('input[name="anotherEmployer"]:checked').value ==
          'Yes'
      ) {
        formData.applications[0].employment.push({
          owner: 'Borrower',
          employerName: $('#prevEmployer').val(),
          currentEmploymentIndicator: false,
          phoneNumber: $('#prevBusinessPhone').val(),
          email: $('#prevBusinessEmail').val(),
          addressStreetLine1: $('#prevBusinessAddress').val(),
          addressCity: $('#prevBusinessCity').val(),
          addressState: $('#prevBusinessState').val(),
          addressPostalCode: $('#prevBusinessZip').val(),
          title: $('#prevPositionTitle').val(),
          startDate: $('#prevStartDate').val(),
          endDate: $('#prevEndDate').val(),
          SelfEmployedIndicator:
            $('#prevSelfEmployed').val() == 'Yes' ? true : false,
        });
      }
      return formData;
    }

    $(submitButton).click(submitButtonLogic);

    function submitButtonLogic() {
      var postURL =
        'https://dtx0yw4xpa.execute-api.us-east-2.amazonaws.com/test/helloworld?agent=' +
        $('#loanOfficer').val();
      var formData = createFormData();
      console.log(formData);
      if (isFormValid) {
        $(
          "form :input:not(:input[type='radio']):not(:input[type='submit'])"
        ).each(function () {
          var id = $(this).attr('id'); // This is the jquery object of the input, do what you will
          if ($('#' + id) && $('#' + id + 'Text')) {
            $('#' + id + 'Text').text($('#' + id).val());
          }
        });
        $('#loanOfficerAgentText').text(
          $('#loanOfficer option:selected').text()
        );
        $('#loanPurposeText').text(
          $('input[name="loanPurpose"]:checked').val()
        );
        postData(postURL, formData).then((data) => {
          if (
            document.querySelector('input[name="coBorrower"]:checked') &&
            document.querySelector('input[name="coBorrower"]:checked').value ==
              'Yes'
          ) {
            $('#coBorrowerInfo').show();
            $('#coBorrowerEmploymentInfo').show();
          }
          if (
            document.querySelector('input[name="anotherEmployer"]:checked') &&
            document.querySelector('input[name="anotherEmployer"]:checked')
              .value == 'Yes'
          ) {
            $('#prevEmploymentInfo').show();
            $('#coBorrowerEmploymentInfo').show();
          }
          applicationForm.style.display = 'none';
          successBlock.style.display = 'block';
          errorBlock.style.display = 'none';
        });
      } else {
        contactForm.reportValidity();
      }
    }
  }
};
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
  });
  return response;
}
