var Webflow = Webflow || [];
var stepheaders = [
  {
    title: "I'm Ready to Save!",
    subtitle: 'Our application is an fast and easy way to get a mortgage.',
  },
  {
    title: 'Tell Us About Yourself...',
    subtitle:
      'We only need a little bit of contact information to get started!',
  },
  {
    title: 'Have Someone to Add?',
    subtitle: 'Tell us about your loan partner!',
  },
  {
    title: 'Employed, Self-Employed, Retired?',
    subtitle:
      'We just need a little information about how you’re going to pay your mortgage.',
  },
  {
    title: 'Your Loan Partner’s Income',
    subtitle:
      'We just need a little information about your loan partners contribution.',
  },
];
var sliderLogic = null;
Webflow.push(function () {
  sliderLogic = new AWF.MSF({
    hiddeButtonsOnSubmit: true,
    scrollTopOnStepChange: false,
    formSelector: '#application-form',
    nextSelector: '#nextBtn',
    backSelector: '#backBtn',
    currentStepSelector: '#current-step',
  });

  new AWF.Logic({
    logicList: [
      {
        conditions: [
          {
            selector: 'input[name="coBorrower"]',
            operator: 'equal',
            value: 'No',
          },
        ],
        operator: 'and',
        actions: [
          { selector: '#coBorrowerFirst', action: 'unrequire', clear: true },
          { selector: '#coBorrowerLast', action: 'unrequire', clear: true },
          { selector: '#coborrowerEmail', action: 'unrequire', clear: true },
          {
            selector: '#coBorrowerPhoneNumber',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerCurrentEmployer',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerPhoneNumber',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerSelfEmployed',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerBusinessEmail',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerBusinessPhone',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerBusinessAddress',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerBusinessCity',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerStartDate',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerEndDate',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerBusinessState',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coborrowerBusinessZip',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#coBorrowerPositionTitle',
            action: 'unrequire',
            clear: true,
          },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="loanOfficer"]',
            operator: 'equal',
            value: 'Yes',
          },
        ],
        operator: 'and',
        actions: [
          { selector: '#workingWithOfficer', action: 'show', clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="loanOfficer"]',
            operator: 'equal',
            value: 'No',
          },
        ],
        operator: 'and',
        actions: [
          { selector: '#workingWithOfficer', action: 'hide', clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="anotherEmployer"]',
            operator: 'equal',
            value: 'Yes',
          },
        ],
        operator: 'and',
        actions: [
          {
            selector: '#prevEmployerContainer',
            action: 'show',
            clear: false,
          },
          {
            selector: '#prevEmployer',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevSelfEmployed',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevBusinessEmail',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevBusinessPhone',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevBusinessAddress',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevBusinessPhone',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevBusinessCity',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevBusinessState',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevBusinessZip',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevPositionTitle',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevStartDate',
            action: 'require',
            clear: true,
          },
          {
            selector: '#prevEndDate',
            action: 'require',
            clear: true,
          },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="anotherEmployer"]',
            operator: 'equal',
            value: 'No',
          },
        ],
        operator: 'and',
        actions: [
          {
            selector: '#prevEmployerContainer',
            action: 'hide',
            clear: false,
          },
          {
            selector: '#prevEmployer',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevSelfEmployed',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevBusinessEmail',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevBusinessPhone',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevBusinessAddress',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevBusinessPhone',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevBusinessCity',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevBusinessState',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevBusinessZip',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevPositionTitle',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevStartDate',
            action: 'unrequire',
            clear: true,
          },
          {
            selector: '#prevEndDate',
            action: 'unrequire',
            clear: true,
          },
        ],
      },
    ],
    submitHiddenInputs: false,
    checkConditionsOnLoad: true,
  });
});

$(document).ready(function () {
  $(':radio').click(function () {
    setTimeout(function () {
      sliderLogic.view.setMaskHeight(sliderLogic.controller.currentStep);
    }, 100);
  });
  $('#customBack').click(function (evt) {
    evt.preventDefault();
    var isCoborrower =
      document.querySelector('input[name="coBorrower"]:checked') &&
      document.querySelector('input[name="coBorrower"]:checked').value == 'Yes';
    if (!isCoborrower && sliderLogic.controller.currentStep == 3) {
      $('.w-slider-nav div:nth-child(2)').trigger('tap');
      sliderLogic.controller.currentStep = 1;
      sliderLogic.view.setStepsDisplay(sliderLogic.controller.currentStep);
    } else {
      document.getElementById('backBtn').click();
    }
  });
  $('#customNext').click(function (evt) {
    evt.preventDefault();
    $('#coborrowerNameContainer').text($('#coBorrowerFirst').val() || '');
    if (
      sliderLogic.controller.currentStep == 1 &&
      document.querySelector('input[name="coBorrower"]:checked') &&
      document.querySelector('input[name="coBorrower"]:checked').value == 'Yes'
    ) {
      $('.if-borrower').show();
      document.getElementById('nextBtn').click();
    } else if (
      sliderLogic.controller.currentStep == 1 &&
      document.querySelector('input[name="coBorrower"]:checked') &&
      document.querySelector('input[name="coBorrower"]:checked').value == 'No'
    ) {
      $('.w-slider-nav div:nth-child(4)').trigger('tap');
      sliderLogic.controller.currentStep = 3;
      sliderLogic.view.setMaskHeight(sliderLogic.controller.currentStep);
      sliderLogic.view.setStepsDisplay(sliderLogic.controller.currentStep);
    } else if (
      sliderLogic.controller.currentStep == 3 &&
      document.querySelector('input[name="coBorrower"]:checked') &&
      document.querySelector('input[name="coBorrower"]:checked').value == 'No'
    ) {
      sliderLogic.controller.currentStep = 4;
      document.getElementById('nextBtn').click();
      //document.getElementById('submitButtonAlt').click();
    } else {
      document.getElementById('nextBtn').click();
    }

    if (sliderLogic.controller.currentStep < stepheaders.length) {
      $('#title').text(stepheaders[sliderLogic.controller.currentStep].title);
      $('#subtitle').text(
        stepheaders[sliderLogic.controller.currentStep].subtitle
      );
    } else {
      $('#title-section').hide();
      $('#step').hide();
      $('#thank-you-title').show();
    }
  });
  $('body').on('DOMSubtreeModified', '#current-step', function (e) {
    var currStep = e.currentTarget.innerHTML;
    if (
      currStep == '5' ||
      (currStep == '4' &&
        document.querySelector('input[name="coBorrower"]:checked') &&
        document.querySelector('input[name="coBorrower"]:checked').value ==
          'No')
    ) {
      $('#customNext').text('Submit');
    } else {
      $('#customNext').text('Next');
    }
    if (currStep == '1') {
      $('#customBack').hide();
    } else {
      $('#customBack').show();
    }
    $('.application-step').removeClass('nav-active');
    $(`.application-step[data-msf-nav=${currStep}]`).addClass('nav-active');
  });
});
