
export default class MCheckbox
{
    constructor()
    {
        // default options
        this.options                            = {};
        this.options.selector                   = "input[type=checkbox]";
        this.options.cbox_fake                  = "cbox-fake";
        this.options.cbox_fake_checked          = "cbox-fake-checked";
        this.options.cbox_fake_disabled         = "cbox-fake-disabled";
        this.options.cbox_fake_checked_disabled = "cbox-fake-checked-disabled";
        this.options.cbox_processed             = "cbox-processed";

    } // constructor


    // @public
    CheckedBySel( sel, check )
    {
        let _input_list = Array.from( document.querySelectorAll( sel ) );

        _input_list.forEach( (_el)=>
        {
            _el.checked = check;
            window.mcheckbox._ProcessEl(_el);
        });

    } // CheckedBySel


    // @public
    SetChecked( check )
    {
        this.checked = check;
        window.mcheckbox._ProcessEl(this);

    } // SetChecked


    // @public
    SetDisabled( disable )
    {
        this.disabled = disable;
        window.mcheckbox._ProcessEl(this);

    } // SetDisabled


    // @public
    Init( options = null )
    {
        let _input_list = [];
        let _options    = Object.assign( this.options, options || this.options );

        _input_list = Array.from( document.querySelectorAll( _options.selector + ":not(."+_options.cbox_processed+")" ) );
    
        _input_list.forEach( (_el)=>
        {
            let _loop      = Object.create(null);
            let _div       = document.createElement("div");
            let _classname = this.cbox_fake;

            _el.parentNode.insertBefore(_div, _el);
            _div.appendChild(_el);

            _loop.cont    = _el.parentNode;
            _loop.cbox    = _el;
            _loop.fake    = _div;
            _loop.options = _options;

            _loop.cont._loop = _loop;
            _loop.cbox._loop = _loop;
            _loop.fake._loop = _loop;
            _el       ._loop = _loop;

            this._ProcessEl(_el);

            _loop.cbox.addEventListener( "change", function(){ window.mcheckbox._ProcessEl(this); } );
            _loop.cbox.SetChecked  = this.SetChecked;
            _loop.cbox.SetDisabled = this.SetDisabled;

        });

    } // Init


    // @private
    _ProcessEl(_el)
    {
        let _loop      = _el._loop;
        let _options   = _el._loop.options;
        let _classname = _options.cbox_fake;

        window.mcheckbox._ClearClassList( _loop.fake );

        if( _el.checked )
        {
            _classname = _el.disabled ? _options.cbox_fake_checked_disabled : _options.cbox_fake_checked;
        }
        else
        {
            _classname = _el.disabled ? _options.cbox_fake_disabled : _options.cbox_fake;
        }

        _loop.fake.classList.add( _classname );
        _loop.fake.classList.add( _options.cbox_processed );

    } // ProcessEl


    // @private
    _ClearClassList( el_fake )
    {
        let _options = el_fake._loop.options;

        el_fake.classList.remove( _options.cbox_fake,
                                  _options.cbox_fake_checked,
                                  _options.cbox_fake_disabled,
                                  _options.cbox_fake_checked_disabled );

    } // _ClearClassList

} // class MCheckbox
