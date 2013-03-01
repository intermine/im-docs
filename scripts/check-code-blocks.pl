use 5.12.0;

my ($block, $in_block, $lang) = ('', 0, undef);

sub handle_block {

    say "Output from $lang";
    say '-' x 40;
    given ($lang) {
        eval($block) or $@ and say("Perl failed: $@") when 'perl';
        system($block)                                when 'bash';
        system('python', '-c', $block)                when 'python';
        system('ruby', '-e', $block)                  when 'ruby';
        system('node', '-e', $block)                  when 'javascript';
        default     { say "Unsupported language: $lang" }
    }
    say '-' x 40;
}

for (<>) {
    if (/^\.\. code-block:: (\w+)/) {
        $in_block = 1;
        $lang = $1;
        $block = '';
        next;
    }
    next unless $in_block;
    if (/^\s+/) {
        s/^  //;
        $block .= $_;
    } else {
        $in_block = 0;
        handle_block();
    }
}

if ($in_block) {
    handle_block();
}

    

    
    
